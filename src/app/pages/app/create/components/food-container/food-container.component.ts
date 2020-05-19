import { FoodDraftState } from './../../../../../core/store/food/food.reducer';
import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { AppState } from '@core/store';
import { FoodFormCreateModel } from '@core/models/food.models';
import {
  foodCreateAction,
  foodDraftMapAction,
  foodDraftCameraAction,
  foodDraftFoodAction,
} from '@core/store/food/food.actions';
import {
  getFoodConditionIsSending,
  getFoodIsMapValid,
  getFoodIsCameraValid,
  getFoodIsFormValid,
  getFoodState,
} from '@core/store/food/food.selectors';
import { Plugins, Capacitor } from '@capacitor/core';
import { AlertController } from '@ionic/angular';
import { RestaurantFormModel } from '@core/models/restaurant.models';
import { MatTabGroup } from '@angular/material/tabs';
import { filter, take, tap } from 'rxjs/operators';

@Component({
  selector: 'app-food-container',
  templateUrl: './food-container.component.html',
  styleUrls: ['./food-container.component.scss'],
})
export class FoodContainerComponent implements OnInit {
  @ViewChild(MatTabGroup, { static: false }) matTabGroup: MatTabGroup;

  isSending$: Observable<boolean>;
  isMapCorrect$: Observable<boolean>;
  isCameraCorrect$: Observable<boolean>;
  isFormCorrect$: Observable<boolean>;

  geolocation = { lat: 0, lng: 0 };

  constructor(
    private store: Store<AppState>,
    private alertCtr: AlertController,
    private ngZone: NgZone
  ) {}

  ngOnInit() {
    this.isMapCorrect$ = this.store.pipe(select(getFoodIsMapValid));
    this.isCameraCorrect$ = this.store.pipe(select(getFoodIsCameraValid));
    this.isFormCorrect$ = this.store.pipe(select(getFoodIsFormValid));

    this.isSending$ = this.store.pipe(select(getFoodConditionIsSending));

    this.setCurrentLocation();
  }

  setDraft(
    formNo: number,
    data: RestaurantFormModel | string | FoodFormCreateModel
  ) {
    setTimeout(() => {
      this.ngZone.run(() => {
        if (formNo === 1) {
          this.store.dispatch(
            foodDraftMapAction({
              payload: { form: data as RestaurantFormModel, isValid: true },
            })
          );
          this.matTabGroup.selectedIndex = 1;
        } else if (formNo === 2) {
          this.store.dispatch(
            foodDraftCameraAction({
              payload: { form: data as string, isValid: true },
            })
          );
          this.matTabGroup.selectedIndex = 2;
        }
      });
    }, 500);
  }

  private setCurrentLocation() {
    if (!Capacitor.isPluginAvailable('Geolocation')) {
      this.alertMsg();

      this.geolocation.lat = 52.231687;
      this.geolocation.lng = 21.006199;
    } else {
      Plugins.Geolocation.getCurrentPosition()
        .then((geoposition) => {
          this.geolocation.lat = geoposition.coords.latitude;
          this.geolocation.lng = geoposition.coords.longitude;
        })
        .catch((err) => this.alertMsg());
    }
  }

  private alertMsg() {
    this.alertCtr
      .create({
        message: 'Nie udało się pobrać aktualnej lokalizacji',
      })
      .then((alertEl) => alertEl.present());
  }

  save(data: FoodDraftState) {
    this.store.dispatch(
      foodDraftFoodAction({
        payload: { form: data.form, isValid: data.isValid },
      })
    );

    this.store
      .select(getFoodState)
      .pipe(
        take(1),
        filter(
          (state) =>
            state.mapDraft.isValid &&
            state.cameraDraft.isValid &&
            state.foodDraft.isValid
        ),
        tap((state) => {
          this.store.dispatch(
            foodCreateAction({
              payload: state,
            })
          );
        })
      )
      .subscribe();
  }
}

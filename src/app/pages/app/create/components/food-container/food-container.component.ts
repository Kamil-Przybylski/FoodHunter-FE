import { FoodDraftState } from '@core/store/food/food-create/food-create.reducer';
import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { AppState } from '@core/store';
import { FoodFormCreateModel } from '@core/models/food.models';
import {
  foodCreateSaveAction,
  foodCreateDraftMapAction,
  foodCreateDraftCameraAction,
  foodCreateDraftFoodAction,
  foodCreateDraftTrueSubmitAction,
  foodTypesDownloadAction,
  foodTagsDownloadAction,
} from '@core/store/food/food-create/food-create.actions';
import {
  getFoodCreateConditionIsSending,
  getFoodCreateIsMapValid,
  getFoodCreateIsCameraValid,
  getFoodCreateIsFormValid,
  getFoodCreateState,
  getFoodCreateCreateIsSubmitted,
  getFoodCreateAllFoodTypes,
  getFoodCreateAllFoodTags,
} from '@core/store/food/food-create/food-create.selectors';
import { Plugins, Capacitor } from '@capacitor/core';
import { AlertController } from '@ionic/angular';
import { RestaurantFormModel } from '@core/models/restaurant.models';
import { MatTabGroup } from '@angular/material/tabs';
import { take, tap } from 'rxjs/operators';
import { FoodType } from '@core/models/food-types.models';
import { FoodTag } from '@core/models/food-tags.models';

@Component({
  selector: 'app-food-container',
  templateUrl: './food-container.component.html',
  styles: [],
})
export class FoodContainerComponent implements OnInit {
  @ViewChild(MatTabGroup) matTabGroup!: MatTabGroup;

  isSending$!: Observable<boolean>;
  isSubmitted$!: Observable<boolean>;
  foodTypes$!: Observable<FoodType[]>;
  foodTags$!: Observable<FoodTag[]>;

  isMapCorrect$!: Observable<boolean>;
  isCameraCorrect$!: Observable<boolean>;
  isFormCorrect$!: Observable<boolean>;

  defaultGeo = { lat: 52.231687, lng: 21.006199 };
  geolocation = { lat: 0, lng: 0 };

  constructor(private store: Store<AppState>, private alertCtr: AlertController, private ngZone: NgZone) {}

  ngOnInit() {
    this.isMapCorrect$ = this.store.pipe(select(getFoodCreateIsMapValid));
    this.isCameraCorrect$ = this.store.pipe(select(getFoodCreateIsCameraValid));
    this.isFormCorrect$ = this.store.pipe(select(getFoodCreateIsFormValid));

    this.foodTypes$ = this.store.pipe(select(getFoodCreateAllFoodTypes));
    this.foodTags$ = this.store.pipe(select(getFoodCreateAllFoodTags));

    this.isSubmitted$ = this.store.pipe(select(getFoodCreateCreateIsSubmitted));
    this.isSending$ = this.store.pipe(select(getFoodCreateConditionIsSending));

    this.setCurrentLocation();
    this.downloadData();
  }

  setDraft(formNo: number, data: RestaurantFormModel | string | FoodFormCreateModel) {
    setTimeout(() => {
      this.ngZone.run(() => {
        if (formNo === 1) {
          this.store.dispatch(
            foodCreateDraftMapAction({
              payload: { mapDraft: { form: data as RestaurantFormModel, isValid: true } },
            })
          );
          this.matTabGroup.selectedIndex = 1;
        } else if (formNo === 2) {
          this.store.dispatch(
            foodCreateDraftCameraAction({
              payload: { cameraDraft: { form: data as string, isValid: true } },
            })
          );
          this.matTabGroup.selectedIndex = 2;
        }
      });
    }, 500);
  }

  private downloadData() {
    this.store.dispatch(foodTypesDownloadAction());
    this.store.dispatch(foodTagsDownloadAction());
  }

  private setCurrentLocation() {
    if (!Capacitor.isPluginAvailable('Geolocation')) {
      this.alertMsg();

      this.geolocation.lat = this.defaultGeo.lat;
      this.geolocation.lng = this.defaultGeo.lng;
    } else {
      Plugins.Geolocation.getCurrentPosition()
        .then((geoposition) => {
          this.geolocation.lat = geoposition.coords.latitude;
          this.geolocation.lng = geoposition.coords.longitude;
        })
        .catch((err) => {
          this.geolocation.lat = this.defaultGeo.lat;
          this.geolocation.lng = this.defaultGeo.lng;

          this.alertMsg();
        });
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
      foodCreateDraftFoodAction({
        payload: { foodDraft: { form: data.form, isValid: data.isValid } },
      })
    );

    this.store
      .select(getFoodCreateState)
      .pipe(
        take(1),
        tap((foodState) => {
          if (foodState.mapDraft.isValid && foodState.cameraDraft.isValid && foodState.foodDraft.isValid) {
            if (!(foodState.foodDraft.form && foodState.cameraDraft.form && foodState.mapDraft.form)) return;
            this.store.dispatch(
              foodCreateSaveAction({
                payload: {
                  foodForm: {
                    food: foodState.foodDraft.form,
                    photo: foodState.cameraDraft.form,
                    restaurant: foodState.mapDraft.form,
                  },
                },
              })
            );
          } else {
            this.store.dispatch(foodCreateDraftTrueSubmitAction());
          }
        })
      )
      .subscribe();
  }
}

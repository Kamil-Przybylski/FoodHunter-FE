import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { AppState } from '@core/store';
import { FoodFormCreateModel } from '@core/models/food.models';
import { foodCreateAction } from '@core/store/food/food.actions';
import { getFoodConditionIsSending } from '@core/store/food/food.selectors';

@Component({
  selector: 'app-food-container',
  templateUrl: './food-container.component.html',
  styleUrls: ['./food-container.component.scss'],
})
export class FoodContainerComponent implements OnInit {
  isSending$: Observable<boolean>;

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.isSending$ = this.store.pipe(select(getFoodConditionIsSending));
  }

  save(data: FoodFormCreateModel) {
    this.store.dispatch(
      foodCreateAction({
        payload: data,
      })
    );
  }
}

import { downloadAction } from './../core/data-condition/data-condition.actions';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { foodCreateAction, foodDownloadAction } from './food.actions';
import { map } from 'rxjs/operators';
import { saveAction } from '../core/data-condition/data-condition.actions';
import { FoodService } from '@core/services/food.service';
import { EntitiesEnum } from '../core/entities/entities.models';

@Injectable()
export class FoodEffects {

  download$ = createEffect(() =>
    this.actions$.pipe(
      ofType(foodDownloadAction),
      map(() => downloadAction()({
        key: EntitiesEnum.FOOD,
        dataId: 0,
        requestObservable: this.foodService.downloadFoods()
      }))
    )
  );

  save$ = createEffect(() =>
    this.actions$.pipe(
      ofType(foodCreateAction),
      map(action => action.payload),
      map((payload) => saveAction()({
        key: EntitiesEnum.FOOD,
        dataId: 0,
        requestObservable: this.foodService.createFood(payload)
      }))
    )
  );

  constructor(
    private actions$: Actions,
    private foodService: FoodService
  ) {}
}

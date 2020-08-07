import { downloadAction } from './../core/data-condition/data-condition.actions';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { foodCreateAction, foodDownloadAction, foodTypesDownloadAction } from './food.actions';
import { map } from 'rxjs/operators';
import { saveAction } from '../core/data-condition/data-condition.actions';
import { FoodService } from '@core/services/food.service';
import { EntitiesEnum } from '../core/entities/entities.models';
import { FoodTypesService } from '@core/services/food-types.service';
import { FoodTagsService } from '@core/services/food-tags.service';

@Injectable()
export class FoodEffects {

  downloadFood$ = createEffect(() =>
    this.actions$.pipe(
      ofType(foodDownloadAction),
      map(() => downloadAction<EntitiesEnum.FOOD, null>()({
        key: EntitiesEnum.FOOD,
        dataId: 0,
        requestObservable: this.foodService.downloadFoods()
      }))
    )
  );

  downloadFoodTypes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(foodTypesDownloadAction),
      map(() => downloadAction<EntitiesEnum.FOOD_TYPE, null>()({
        key: EntitiesEnum.FOOD_TYPE,
        dataId: 0,
        requestObservable: this.foodTypeService.downloadFoodTypes()
      }))
    )
  );

  downloadFoodTags$ = createEffect(() =>
    this.actions$.pipe(
      ofType(foodTypesDownloadAction),
      map(() => downloadAction<EntitiesEnum.FOOD_TAG, null>()({
        key: EntitiesEnum.FOOD_TAG,
        dataId: 0,
        requestObservable: this.foodTagsService.downloadFoodTags()
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
    private foodService: FoodService,
    private foodTypeService: FoodTypesService,
    private foodTagsService: FoodTagsService,
  ) {}
}

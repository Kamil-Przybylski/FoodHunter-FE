import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { foodCreateSaveAction, foodTypesDownloadAction } from '@core/store/food/food-create/food-create.actions';
import { map } from 'rxjs/operators';
import { FoodService } from '@core/services/food.service';
import { EntitiesEnum } from '@core/store/core/entities/entities.models';
import { FoodTypesService } from '@core/services/food-types.service';
import { FoodTagsService } from '@core/services/food-tags.service';
import { downloadAction, saveAction } from '@core/store/core/data-condition/data-condition.actions';

@Injectable()
export class FoodEffects {
  downloadFoodTypes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(foodTypesDownloadAction),
      map(() =>
        downloadAction<EntitiesEnum.FOOD_TYPE, null>()({
          key: EntitiesEnum.FOOD_TYPE,
          dataId: 0,
          requestObservable: this.foodTypeService.downloadFoodTypes(),
        })
      )
    )
  );

  downloadFoodTags$ = createEffect(() =>
    this.actions$.pipe(
      ofType(foodTypesDownloadAction),
      map(() =>
        downloadAction<EntitiesEnum.FOOD_TAG, null>()({
          key: EntitiesEnum.FOOD_TAG,
          dataId: 0,
          requestObservable: this.foodTagsService.downloadFoodTags(),
        })
      )
    )
  );

  save$ = createEffect(() =>
    this.actions$.pipe(
      ofType(foodCreateSaveAction),
      map((action) => action.payload),
      map(({ foodForm }) =>
        saveAction()({
          key: EntitiesEnum.FOOD,
          dataId: 0,
          requestObservable: this.foodService.createFood(foodForm),
        })
      )
    )
  );

  constructor(
    private actions$: Actions,
    private foodService: FoodService,
    private foodTypeService: FoodTypesService,
    private foodTagsService: FoodTagsService
  ) {}
}

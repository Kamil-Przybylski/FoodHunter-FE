import { Injectable } from '@angular/core';
import { HttpPaginator, HttpPaginatorMeta } from '@core/models/custom-http.models';
import { Food } from '@core/models/food.models';
import { FoodService } from '@core/services/food.service';
import { downloadAction, saveAction } from '@core/store/core/data-condition/data-condition.actions';
import { EntitiesEnum } from '@core/store/core/entities/entities.models';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map } from 'rxjs/operators';
import {
  foodListDownloadFoodListFoodAction,
  foodListDownloadSingleFoodAction,
  foodListDownloadUserFoodAction,
  foodListSetLikeForFoodAction,
} from './food-list.actions';

@Injectable()
export class FoodListEffects {
  downloadFoodList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(foodListDownloadFoodListFoodAction),
      map((action) => action.payload),
      map(({ pageNo }) => {
        let metaData: HttpPaginatorMeta;

        return downloadAction<EntitiesEnum.FOOD, HttpPaginatorMeta>()({
          key: EntitiesEnum.FOOD,
          dataId: 0,
          requestObservable: this.foodService
            .downloadFoods(pageNo, (r: HttpPaginator<Food[]>) => {
              metaData = r.meta;
              return r.items;
            })
            .pipe(map((r) => ({ entities: r, loadData: metaData }))),
        });
      })
    )
  );

  downloadUserFood$ = createEffect(() =>
    this.actions$.pipe(
      ofType(foodListDownloadUserFoodAction),
      map((action) => action.payload),
      map(({ userId, pageNo }) => {
        let metaData: HttpPaginatorMeta;

        return downloadAction<EntitiesEnum.FOOD, HttpPaginatorMeta>()({
          key: EntitiesEnum.FOOD,
          dataId: `user-${userId}`,
          requestObservable: this.foodService
            .downloadUserFoods(userId, pageNo, (r: HttpPaginator<Food[]>) => {
              metaData = r.meta;
              return r.items;
            })
            .pipe(map((r) => ({ entities: r, loadData: metaData }))),
        });
      })
    )
  );

  downloadFood$ = createEffect(() =>
    this.actions$.pipe(
      ofType(foodListDownloadSingleFoodAction),
      map((action) => action.payload),
      map(({ foodId }) => {
        return downloadAction<EntitiesEnum.FOOD, null>()({
          key: EntitiesEnum.FOOD,
          dataId: `food-${foodId}`,
          requestObservable: this.foodService.downloadFood(foodId),
        });
      })
    )
  );

  setLikeFood$ = createEffect(() =>
  this.actions$.pipe(
    ofType(foodListSetLikeForFoodAction),
    map((action) => action.payload),
    map(({ foodId }) => {
      return saveAction<EntitiesEnum.FOOD, null>()({
        key: EntitiesEnum.FOOD,
        dataId: `like-${foodId}`,
        requestObservable: this.foodService.setLikeFood(foodId),
      });
    })
  )
);

  constructor(private actions$: Actions, private foodService: FoodService) {}
}

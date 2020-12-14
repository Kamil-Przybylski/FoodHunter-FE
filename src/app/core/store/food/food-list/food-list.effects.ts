import { Injectable } from '@angular/core';
import { HttpPaginator, HttpPaginatorMeta } from '@core/models/custom-http.models';
import { Food } from '@core/models/food.models';
import { FoodService } from '@core/services/food.service';
import { downloadAction } from '@core/store/core/data-condition/data-condition.actions';
import { EntitiesEnum } from '@core/store/core/entities/entities.models';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map } from 'rxjs/operators';
import { foodListDownloadFoodAction } from './food-list.actions';

@Injectable()
export class FoodListEffects {
  downloadUserFood$ = createEffect(() =>
    this.actions$.pipe(
      ofType(foodListDownloadFoodAction),
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

  constructor(private actions$: Actions, private foodService: FoodService) {}
}

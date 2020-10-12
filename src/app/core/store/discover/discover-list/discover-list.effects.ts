import { Injectable } from '@angular/core';
import { HttpPaginator, HttpPaginatorMeta } from '@core/models/custom-http.models';
import { Food } from '@core/models/food.models';
import { FoodService } from '@core/services/food.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map } from 'rxjs/operators';
import { downloadAction } from '@core/store/core/data-condition/data-condition.actions';
import { EntitiesEnum } from '@core/store/core/entities/entities.models';
import { discoverListDownloadFoodAction } from '@core/store/discover/discover-list/discover-list.actions';

@Injectable()
export class DiscoverListEffects {
  downloadFood$ = createEffect(() =>
    this.actions$.pipe(
      ofType(discoverListDownloadFoodAction),
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

  constructor(private actions$: Actions, private foodService: FoodService) {}
}

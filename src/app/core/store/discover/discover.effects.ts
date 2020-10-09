import { Injectable } from '@angular/core';
import { HttpPaginator, HttpPaginatorMeta } from '@core/models/custom-http.models';
import { Food } from '@core/models/food.models';
import { FoodService } from '@core/services/food.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map } from 'rxjs/operators';
import { downloadAction } from '../core/data-condition/data-condition.actions';
import { EntitiesEnum } from '../core/entities/entities.models';
import { discoverDownloadFoodAction } from './discover.actions';

@Injectable()
export class DiscoverEffects {
  downloadFood$ = createEffect(() =>
    this.actions$.pipe(
      ofType(discoverDownloadFoodAction),
      map(({payload}) => {
        let metaData: HttpPaginatorMeta;

        return downloadAction<EntitiesEnum.FOOD, HttpPaginatorMeta>()({
          key: EntitiesEnum.FOOD,
          dataId: 0,
          requestObservable: this.foodService
            .downloadFoods(payload, (r: HttpPaginator<Food[]>) => {
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

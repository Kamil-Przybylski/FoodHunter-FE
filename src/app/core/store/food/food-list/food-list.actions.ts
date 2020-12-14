import { HttpPaginatorMeta } from '@core/models/custom-http.models';
import { createAction, props } from '@ngrx/store';

export const foodListDownloadFoodAction = createAction(
  '[Food List] Download User Food Data Action',
  props<{ payload: { userId: number; pageNo: number } }>()
);
export const foodListSetPaginatorAction = createAction(
  '[Food List] Set Paginator Action',
  props<{ payload: { paginator: HttpPaginatorMeta } }>()
);

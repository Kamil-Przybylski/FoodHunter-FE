import { HttpPaginatorMeta } from '@core/models/custom-http.models';
import { createAction, props } from '@ngrx/store';

export const accountFoodSetPaginatorAction = createAction(
  '[Account Food] Set Paginator Action',
  props<{ payload: { paginator: HttpPaginatorMeta } }>()
);

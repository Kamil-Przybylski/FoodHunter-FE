import { HttpPaginatorMeta } from '@core/models/custom-http.models';
import { createAction, props } from '@ngrx/store';

export const discoverListSetPaginatorAction = createAction(
  '[Discover List] Set Paginator Action',
  props<{ payload: { paginator: HttpPaginatorMeta } }>()
);

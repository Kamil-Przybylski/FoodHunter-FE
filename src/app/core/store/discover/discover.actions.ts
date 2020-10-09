import { HttpPaginatorMeta } from '@core/models/custom-http.models';
import { createAction, props } from '@ngrx/store';

export const discoverDownloadFoodAction = createAction(
  '[Discover] Download Food Data Action',
  props<{ payload: number }>()
);
export const discoverSetPaginatorAction = createAction(
  '[Discover] Set Paginator Action',
  props<{ payload: HttpPaginatorMeta }>()
);

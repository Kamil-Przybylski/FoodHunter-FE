import { createAction, props } from '@ngrx/store';

export const layoutRouterLoginAction = createAction(
  '[Layout] Router Login Action',
  props<{ payload: { url: string } }>()
);

export const layoutRouterSetPreviousPageAction = createAction(
  '[Layout] Router Set Previous Page Action',
  props<{ payload: { url: string } }>()
);

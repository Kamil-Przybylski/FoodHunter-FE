import { createAction, props } from '@ngrx/store';

export const layoutRouterLoginAction = createAction(
  '[Layout] Router Login Action',
  props<{ payload: { url: string } }>()
);

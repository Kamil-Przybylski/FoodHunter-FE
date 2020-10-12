import { AuthFormUserModel, AuthUser } from '@core/models/auth.models';
import { HttpErrorRes } from '@core/models/custom-http.models';
import { createAction, props } from '@ngrx/store';

export const accountUserUpdateInfoDraftAction = createAction(
  '[Account User] Update Info Draft Action',
  props<{ payload: {formVal: AuthFormUserModel} }>()
);

export const accountUserUpdatePhotoDraftAction = createAction(
  '[Account User] Update Photo Draft Action',
  props<{ payload: {photoPath: string} }>()
);

export const accountUserSaveAction = createAction(
  '[Account User] Save Action',
  props<{ payload: {data: AuthFormUserModel} }>()
);
export const accountUserSaveSuccessAction = createAction(
  '[Account User] Save Success Action',
  props<{ payload: {data: AuthUser} }>()
);
export const accountUserSaveFailAction = createAction(
  '[Account User] Save Fail Action',
  props<{ payload: {httpError: HttpErrorRes} }>()
);

export const accountUserClearDraftAction = createAction(
  '[Account User] Clear Draft Action',
);

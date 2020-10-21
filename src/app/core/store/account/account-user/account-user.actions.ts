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

export const accountUserSaveInfoAction = createAction(
  '[Account User] Save User Info Action',
  props<{ payload: {data: AuthFormUserModel} }>()
);
export const accountUserSavePhotoAction = createAction(
  '[Account User] Save User Photo Action',
  props<{ payload: {photo: string, user: AuthUser} }>()
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

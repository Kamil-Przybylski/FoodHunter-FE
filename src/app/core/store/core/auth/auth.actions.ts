import { AuthData, AuthFormSingInModel, AuthUser } from '@core/models/auth.models';
import { HttpErrorRes } from './../../../models/custom-http.models';
import { createAction, props } from '@ngrx/store';
import { FormSingUpModel } from 'src/app/pages/register/register-form/register-form.component';

export const authSingInAction = createAction(
  '[Auth] Sing In Action',
  props<{ payload: { formModel: AuthFormSingInModel } }>()
);
export const authSingInSuccessAction = createAction(
  '[Auth] Sing In Success',
  props<{ payload: { authData: AuthData } }>()
);
export const authSingInFailAction = createAction(
  '[Auth] Sing In Fail',
  props<{ payload: { httpError: HttpErrorRes } }>()
);
export const authSingInRedirectAction = createAction('[Auth] Sing In Redirect');

export const authSingUpAction = createAction(
  '[Auth] Sing Up Action',
  props<{ payload: { formModel: FormSingUpModel } }>()
);
export const authSingUpSuccessAction = createAction('[Auth] Sing Up Success Action');
export const authSingUpFailAction = createAction(
  '[Auth] Sing Up Fail Action',
  props<{ payload: { httpError: HttpErrorRes } }>()
);

export const authLoginAction = createAction('[Auth] Login', props<{ payload: { url: string } }>());
export const authLoginSuccessAction = createAction(
  '[Auth] Login Success',
  props<{ payload: { user: AuthUser; url: string } }>()
);
export const authLoginFailAction = createAction('[Auth] Login Fail Action');

export const authLogoutAction = createAction('[Auth] Logout Action');

export const authUpdateUser = createAction('[Auth] Update User Action', props<{ payload: { authUser: AuthUser } }>());

import { ResUserDto } from './../../../models/auth.models';
import { HttpErrorRes } from './../../../models/custom-http.models';
import { createAction, props } from '@ngrx/store';
import {
  ReqSingInDto,
  ResSingInDto,
} from 'src/app/core/models/auth.models';

export const authSingInAction = createAction(
  '[Auth] Sing In Action',
  props<{ payload: ReqSingInDto }>()
);

export const authSingInSuccessAction = createAction(
  '[Auth] Sing In Success',
  props<{ payload: ResSingInDto }>()
);

export const authSingInFailAction = createAction(
  '[Auth] Sing In Fail',
  props<{ payload: HttpErrorRes }>()
);

export const authSingInRedirectAction = createAction('[Auth] Sing In Redirect');

export const authLoginAction = createAction(
  '[Auth] Login',
  props<{ payload: string }>()
);

export const authLoginSuccessAction = createAction(
  '[Auth] Login Success',
  props<{ payload: { user: ResUserDto; url: string } }>()
);

export const authLoginFailAction = createAction('[Auth] Login Fail');

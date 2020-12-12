import { createReducer, on } from '@ngrx/store';
import * as authActions from './auth.actions';
import * as _ from 'lodash';
import { HttpErrorRes } from '@core/models/custom-http.models';
import { AuthUser } from '@core/models/auth.models';

export interface AuthState {
  isLogging: boolean;
  isLoginSuccess: boolean;
  loginErrors: HttpErrorRes | null;

  isRegistration: boolean;
  registerErrors: HttpErrorRes | null;

  userData: AuthUser | null;
}

const initialState: AuthState = {
  isLogging: false,
  isLoginSuccess: false,
  loginErrors: null,

  isRegistration: false,
  registerErrors: null,

  userData: null,
};

export const authReducer = createReducer(
  initialState,
  on(authActions.authSingInAction, (state) =>
    _.assign({}, state, {
      isLogging: true,
      isLoginSuccess: false,
      loginErrors: null,
      userData: null,
    } as AuthState)
  ),
  on(authActions.authSingInSuccessAction, (state, { payload }) =>
    _.assign({}, state, {
      isLogging: false,
      isLoginSuccess: true,
      loginErrors: null,
      userData: payload.authData.user,
    } as AuthState)
  ),
  on(authActions.authSingInFailAction, (state, { payload }) =>
    _.assign({}, state, {
      isLogging: false,
      isLoginSuccess: false,
      loginErrors: payload.httpError,
      userData: null,
    } as AuthState)
  ),

  on(authActions.authLoginAction, (state) =>
    _.assign({}, state, {
      isLogging: true,
      isLoginSuccess: false,
      loginErrors: null,
      userData: null,
    } as AuthState)
  ),
  on(authActions.authLoginSuccessAction, (state, { payload }) =>
    _.assign({}, state, {
      isLogging: false,
      isLoginSuccess: true,
      loginErrors: null,
      userData: payload.user,
    } as AuthState)
  ),
  on(authActions.authLoginFailAction, (state) =>
    _.assign({}, state, {
      isLogging: false,
      isLoginSuccess: false,
      loginErrors: null,
      userData: null,
    } as AuthState)
  ),

  on(authActions.authSingUpAction, (state) =>
    _.assign({}, state, {
      isRegistration: true,
    } as AuthState)
  ),
  on(authActions.authSingUpSuccessAction, (state) =>
    _.assign({}, state, {
      isRegistration: false,
    } as AuthState)
  ),
  on(authActions.authSingUpFailAction, (state, { payload }) =>
    _.assign({}, state, {
      isRegistration: false,
      registerErrors: payload.httpError,
    } as AuthState)
  ),
  on(authActions.authUpdateUser, (state, { payload }) =>
    _.assign({}, state, { userData: payload.authUser } as AuthState)
  )
);

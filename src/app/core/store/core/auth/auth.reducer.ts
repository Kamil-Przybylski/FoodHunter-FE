import { createReducer, on } from '@ngrx/store';
import * as authActions from './auth.actions';
import * as _ from 'lodash';
import { HttpErrorRes } from '@core/models/custom-http.models';
import { AuthUser } from '@core/models/auth.models';

export interface AuthState {
  isLogging: boolean;
  isLoginSuccess: boolean;
  loginErrors: HttpErrorRes;

  isRegistration: boolean;
  registerErrors: HttpErrorRes;

  userData: AuthUser;
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
  on(authActions.authSingInAction, (state, { payload }) =>
    _.assign({}, state, {
      isLogging: true,
      isLoginSuccess: false,
      loginErrors: null,
      userData: null,
    })
  ),
  on(authActions.authSingInSuccessAction, (state, { payload }) =>
    _.assign({}, state, {
      isLogging: false,
      isLoginSuccess: true,
      loginErrors: null,
      userData: payload.user,
    })
  ),
  on(authActions.authSingInFailAction, (state, { payload }) =>
    _.assign({}, state, {
      isLogging: false,
      isLoginSuccess: false,
      loginErrors: payload,
      userData: null,
    })
  ),

  on(authActions.authLoginAction, (state) => {
    return _.assign({}, state, {
      isLogging: true,
      isLoginSuccess: false,
      loginErrors: null,
      userData: null,
    });
  }),
  on(authActions.authLoginSuccessAction, (state, { payload }) => {
    return _.assign({}, state, {
      isLogging: false,
      isLoginSuccess: true,
      loginErrors: null,
      userData: payload.user,
    });
  }),
  on(authActions.authLoginFailAction, (state) => {
    return _.assign({}, state, {
      isLogging: false,
      isLoginSuccess: false,
      loginErrors: null,
      userData: null,
    });
  }),

  on(authActions.authSingUpAction, (state) => {
    return _.assign({}, state, {
      isRegistration: true,
    });
  }),
  on(authActions.authSingUpSuccessAction, (state) => {
    return _.assign({}, state, {
      isRegistration: false,
    });
  }),
  on(authActions.authSingUpFailAction, (state, { payload }) => {
    return _.assign({}, state, {
      isRegistration: false,
      registerErrors: payload,
    });
  }),
  on(authActions.authUpdateUser, (state, { payload }) => {
    return _.assign({}, state, { userData: payload });
  })
);

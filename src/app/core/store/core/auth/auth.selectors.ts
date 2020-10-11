import { createSelector } from '@ngrx/store';
import { getCoreModuleState } from '../core.reducer';

export const getAuthState = createSelector(
  getCoreModuleState,
  coreState => coreState.auth
);

export const getAuthIsLoginSuccess = createSelector(
  getAuthState,
  authState => authState.isLoginSuccess
);

export const getAuthIsLogging = createSelector(
  getAuthState,
  authState => authState.isLogging
);

export const getAuthIsRegistration = createSelector(
  getAuthState,
  authState => authState.isRegistration
);

export const getAuthErrors = createSelector(
  getAuthState,
  authState => authState.loginErrors
);

export const getRegisterErrors = createSelector(
  getAuthState,
  authState => authState.registerErrors
);


export const getAuthUser = createSelector(
  getAuthState,
  authState => authState.userData
);
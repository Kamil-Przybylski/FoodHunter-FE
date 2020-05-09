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

export const getAuthErrors = createSelector(
  getAuthState,
  authState => authState.loginErrors
);

import { getAuthUser } from '@core/store/core/auth/auth.selectors';
import { createSelector } from '@ngrx/store';
import { getAccountModuleState } from '../account.reducer';

export const getAccountUserState = createSelector(
  getAccountModuleState,
  state => state.accountUser
);

export const getAccountUserAuthUser = createSelector(
  getAuthUser,
  user => user
);

export const getAccountUserPhotoDraft = createSelector(
  getAccountUserState,
  userState => userState.avatarPhotoDraft
);

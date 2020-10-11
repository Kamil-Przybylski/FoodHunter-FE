import { getAuthUser } from '@core/store/core/auth/auth.selectors';
import { createSelector } from '@ngrx/store';

export const getAccountUserAuthUser = createSelector(
  getAuthUser,
  user => user
);

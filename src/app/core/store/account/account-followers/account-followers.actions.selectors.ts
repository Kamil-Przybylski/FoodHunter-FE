import { EntitiesEnum } from '@core/store/core/entities/entities.models';
import { getEntitiesByDataConditionIds } from '@core/store/core/entities/entities.selectors';
import { createSelector } from '@ngrx/store';
import { getAccountModuleState } from '../account.reducer';

export const getAccountFollowersState = createSelector(
  getAccountModuleState,
  state => state.accountFollowers
);

export const getAccountAllFollowersList = createSelector(
  getEntitiesByDataConditionIds(EntitiesEnum.USER_SHORT, 0),
  users => users
);

export const getAccountUserFollowersList = (userId: number) => createSelector(
  getEntitiesByDataConditionIds(EntitiesEnum.USER_SHORT, userId),
  state => state
);



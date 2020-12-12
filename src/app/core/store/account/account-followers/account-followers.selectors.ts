import { EntitiesEnum } from '@core/store/core/entities/entities.models';
import { getEntitiesByDataConditionIds, getEntitiesSelectEntities } from '@core/store/core/entities/entities.selectors';
import { createSelector } from '@ngrx/store';
import { getAccountModuleState } from '@core/store/account/account.reducer';
import { getAuthUser } from '@core/store/core/auth/auth.selectors';
import { UserDtoModel, UserShortDtoModel } from '@core/models/user.models';

export const getFollowersState = createSelector(getAccountModuleState, (state) => state.accountFollowers);

export const getFollowersAllList = createSelector(
  getEntitiesByDataConditionIds(EntitiesEnum.USER_SHORT, 0),
  (users) => users || []
);

export const getFollowersUserList = createSelector(
  getEntitiesByDataConditionIds(EntitiesEnum.USER_SHORT, 1),
  (users) => users || []
);

export const getFollowersEntities = createSelector(
  getEntitiesSelectEntities(EntitiesEnum.USER),
  (userEntities) => userEntities
);

export const getFollowersShortEntities = createSelector(
  getEntitiesSelectEntities(EntitiesEnum.USER_SHORT),
  (userEntities) => userEntities
);

export const getFollowersIsEditMode = (userId: number) =>
  createSelector(getAuthUser, (authUser) => authUser?.id === userId || false);

export const getFollowersUser = (userId: number) =>
  createSelector(
    getAuthUser,
    getFollowersEntities,
    getFollowersIsEditMode(userId),
    (authUser, userEntities, isEditMode) => {
      let user = userEntities[userId];
      if (isEditMode) user = UserDtoModel.createUserFromAuthUser(authUser);
      return user;
    }
  );

export const getFollowersUserShort = (userId: number) =>
  createSelector(
    getAuthUser,
    getFollowersShortEntities,
    getFollowersIsEditMode(userId),
    (authUser, userShortEntities, isEditMode) => {
      let userShort = userShortEntities[userId];
      if (isEditMode) userShort = UserShortDtoModel.createUserShortFromAuthUser(authUser);
      return userShort;
    }
  );

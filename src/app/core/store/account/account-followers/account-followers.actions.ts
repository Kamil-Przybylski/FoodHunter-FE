import { createAction, props } from '@ngrx/store';

export const accountFollowersShortDownloadAllAction = createAction(
  '[Account Followers] Download All Followers Action',
);

export const accountUserFollowersShortDownloadAction = createAction(
  '[Account Followers] Download User Followers Action',
  props<{ payload: { userId: number } }>()
);
export const accountUserDownloadUserAction = createAction(
  '[Account Followers] Download User Follower Action',
  props<{ payload: { userId: number } }>()
);

export const accountUserFollowersAddFollowerAction = createAction(
  '[Account Followers] Add Followers Action',
  props<{ payload: { authUserId: number, userId: number } }>()
);
export const accountUserFollowersRemoveFollowerAction = createAction(
  '[Account Followers] Remove Followers Action',
  props<{ payload: { authUserId: number, userId: number } }>()
);

import { createAction, props } from '@ngrx/store';

export const accountFollowersDownloadAllAction = createAction(
  '[Account Followers] Download All Followers Action',
);

export const accountUserFollowersDownloadAction = createAction(
  '[Account Followers] Download User Followers Action',
  props<{ payload: { userId: number } }>()
);

export const accountUserFollowersAddFollowerAction = createAction(
  '[Account Followers] Add Followers Action',
  props<{ payload: { userId: number } }>()
);
export const accountUserFollowersRemoveFollowerAction = createAction(
  '[Account Followers] Remove Followers Action',
  props<{ payload: { userId: number } }>()
);

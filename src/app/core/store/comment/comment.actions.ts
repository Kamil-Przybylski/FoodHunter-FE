import { createAction, props } from '@ngrx/store';

export const commentDownloadFoodCommentsAction = createAction(
  '[Comment] Download Food Comments Action',
  props<{ payload: {foodId: number} }>()
);

export const commentSaveFoodCommentAction = createAction(
  '[Comment] Save Food Comment Action',
  props<{ payload: {foodId: number, comment: string} }>()
);

import { createAction, props } from '@ngrx/store';

export const foodListDownloadFoodListFoodAction = createAction(
  '[Discover List] Download Food List Action',
  props<{ payload: { pageNo: number } }>()
);

export const foodListDownloadSingleFoodAction = createAction(
  '[Food List] Download Food Data Action',
  props<{ payload: { foodId: number } }>()
);

export const foodListDownloadUserFoodAction = createAction(
  '[Food List] Download User Food Data Action',
  props<{ payload: { userId: number; pageNo: number } }>()
);

export const foodListSetLikeForFoodAction = createAction(
  '[Food List] Set Like For Food Action',
  props<{ payload: { foodId: number } }>()
);

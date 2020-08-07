import { createAction, props } from '@ngrx/store';
import { MapDraftState, CameraDraftState, FoodDraftState, FoodState } from './food.reducer';

export const foodDownloadAction = createAction(
  '[Food] Download Food Data Action',
);
export const foodTypesDownloadAction = createAction(
  '[Food] Download Food Types Data Action',
);
export const foodTagsDownloadAction = createAction(
  '[Food] Download Food Tags Data Action',
);

export const foodCreateAction = createAction(
  '[Food] Create Food Action',
  props<{ payload: FoodState }>()
);

export const foodDraftMapAction = createAction(
  '[Food Draft] Food Draft Map Action',
  props<{ payload: MapDraftState }>()
);

export const foodDraftCameraAction = createAction(
  '[Food Draft] Food Draft Camera Action',
  props<{ payload: CameraDraftState }>()
);

export const foodDraftFoodAction = createAction(
  '[Food Draft] Food Draft Food Action',
  props<{ payload: FoodDraftState }>()
);

export const foodDraftTrueSubmitAction = createAction(
  '[Food Draft] Food Draft True Submit Action',
);

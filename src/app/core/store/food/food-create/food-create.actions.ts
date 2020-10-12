import { createAction, props } from '@ngrx/store';
import { MapDraftState, CameraDraftState, FoodDraftState, FoodCreateState } from '@core/store/food/food-create/food-create.reducer';

export const foodTypesDownloadAction = createAction('[Food] Download Food Types Data Action');
export const foodTagsDownloadAction = createAction('[Food] Download Food Tags Data Action');

export const foodCreateSaveAction = createAction(
  '[Food Create] Create Food Action',
  props<{ payload: { foodState: FoodCreateState } }>()
);

export const foodCreateDraftMapAction = createAction(
  '[Food Create Draft] Set Draft Map Action',
  props<{ payload: { mapDraft: MapDraftState } }>()
);

export const foodCreateDraftCameraAction = createAction(
  '[Food Create Draft] Set Draft Camera Action',
  props<{ payload: { cameraDraft: CameraDraftState } }>()
);

export const foodCreateDraftFoodAction = createAction(
  '[Food Create Draft] Set Draft Food Action',
  props<{ payload: { foodDraft: FoodDraftState } }>()
);

export const foodCreateDraftTrueSubmitAction = createAction('[Food Draft] Draft True Submit Action');

import { createAction, props } from '@ngrx/store';
import { FoodFormCreateModel } from '@core/models/food.models';

export const foodDownloadAction = createAction(
  '[Food] Download Food Data Action',
);

export const foodCreateAction = createAction(
  '[Food] Create Food Action',
  props<{ payload: FoodFormCreateModel }>()
);

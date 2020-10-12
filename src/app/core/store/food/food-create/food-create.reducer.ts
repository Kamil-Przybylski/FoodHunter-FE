import { createFeatureSelector, createReducer, on } from '@ngrx/store';
import { RestaurantFormModel } from '@core/models/restaurant.models';
import { FoodFormCreateModel } from '@core/models/food.models';
import {
  foodCreateDraftMapAction,
  foodCreateDraftCameraAction,
  foodCreateDraftFoodAction,
  foodCreateSaveAction,
  foodCreateDraftTrueSubmitAction,
} from '@core/store/food/food-create/food-create.actions';
import * as _ from 'lodash';

export interface MapDraftState {
  form: RestaurantFormModel;
  isValid: boolean;
}
export interface CameraDraftState {
  form: string;
  isValid: boolean;
}
export interface FoodDraftState {
  form: FoodFormCreateModel;
  isValid: boolean;
}

const draftInitialState = {
  form: null,
  isValid: false,
};

export interface FoodCreateState {
  mapDraft: MapDraftState;
  cameraDraft: CameraDraftState;
  foodDraft: FoodDraftState;
  isSubmitted: boolean;
}
const foodCreateInitialState: FoodCreateState = {
  mapDraft: draftInitialState,
  cameraDraft: draftInitialState,
  foodDraft: draftInitialState,
  isSubmitted: false,
};

export const foodCreateReducer = createReducer(
  foodCreateInitialState,
  on(foodCreateDraftMapAction, (state, { payload }) =>
    _.assign({}, state, { mapDraft: payload.mapDraft } as FoodCreateState)
  ),
  on(foodCreateDraftCameraAction, (state, { payload }) =>
    _.assign({}, state, { cameraDraft: payload.cameraDraft } as FoodCreateState)
  ),
  on(foodCreateDraftFoodAction, (state, { payload }) =>
    _.assign({}, state, { foodDraft: payload.foodDraft } as FoodCreateState)
  ),
  on(foodCreateDraftTrueSubmitAction, foodCreateSaveAction, (state) =>
    _.assign({}, state, { isSubmitted: true } as FoodCreateState)
  )
);

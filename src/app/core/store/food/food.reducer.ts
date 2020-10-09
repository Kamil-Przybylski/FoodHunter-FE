import { createFeatureSelector, createReducer, on } from '@ngrx/store';
import { RestaurantFormModel } from '@core/models/restaurant.models';
import { FoodFormCreateModel } from '@core/models/food.models';
import {
  foodDraftMapAction,
  foodDraftCameraAction,
  foodDraftFoodAction,
  foodCreateAction,
  foodDraftTrueSubmitAction,
} from './food.actions';
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

const mapInitialState = {
  form: null,
  isValid: false,
};

export interface FoodState {
  mapDraft: MapDraftState;
  cameraDraft: CameraDraftState;
  foodDraft: FoodDraftState;
  isSubmitted: boolean;
}
const foodInitialState: FoodState = {
  mapDraft: mapInitialState,
  cameraDraft: mapInitialState,
  foodDraft: mapInitialState,
  isSubmitted: false,
};

export const foodReducer = createReducer(
  foodInitialState,
  on(foodDraftMapAction, (state, { payload }) =>
    _.assign({}, state, { mapDraft: payload })
  ),
  on(foodDraftCameraAction, (state, { payload }) =>
    _.assign({}, state, { cameraDraft: payload })
  ),
  on(foodDraftFoodAction, (state, { payload }) =>
    _.assign({}, state, { foodDraft: payload })
  ),
  on(foodDraftTrueSubmitAction, foodCreateAction, (state) =>
    _.assign({}, state, { isSubmitted: true })
  )
);

export const getFoodModuleState = createFeatureSelector<FoodState>('food');

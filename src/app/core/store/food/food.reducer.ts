import {
  createFeatureSelector,
  createReducer,
  combineReducers,
  on,
} from '@ngrx/store';
import { RestaurantFormModel } from '@core/models/restaurant.models';
import { FoodFormCreateModel } from '@core/models/food.models';
import { PayloadAction } from '..';
import {
  foodDraftMapAction,
  foodDraftCameraAction,
  foodDraftFoodAction,
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

const MapInitialState = {
  form: null,
  isValid: false,
};

export interface FoodState {
  mapDraft: MapDraftState;
  cameraDraft: CameraDraftState;
  foodDraft: FoodDraftState;
}

const mapDraftReducer = createReducer(
  MapInitialState,
  on(foodDraftMapAction, (state, { payload }) => _.assign({}, state, payload))
);
const cameraDraftReducer = createReducer(
  MapInitialState,
  on(foodDraftCameraAction, (state, { payload }) => _.assign({}, state, payload))
);
const foodDraftReducer = createReducer(
  MapInitialState,
  on(foodDraftFoodAction, (state, { payload }) => _.assign({}, state, payload))
);

export const foodReducer = combineReducers<FoodState, PayloadAction>({
  mapDraft: mapDraftReducer,
  cameraDraft: cameraDraftReducer,
  foodDraft: foodDraftReducer,
});

export const getFoodModuleState = createFeatureSelector<FoodState>('food');

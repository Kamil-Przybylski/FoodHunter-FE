import { ActionReducer, combineReducers, createFeatureSelector } from '@ngrx/store';
import { PayloadAction } from '..';
import { foodCreateReducer, FoodCreateState } from './food-create/food-create.reducer';

export interface FoodModuleState {
  foodCreate: FoodCreateState;
}

export const foodModuleReducer: ActionReducer<FoodModuleState, PayloadAction> = combineReducers({
  foodCreate: foodCreateReducer,
});

export const getFoodModuleState = createFeatureSelector<FoodModuleState>('food');

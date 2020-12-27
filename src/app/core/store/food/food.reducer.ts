import { ActionReducer, combineReducers, createFeatureSelector } from '@ngrx/store';
import { PayloadAction } from '..';
import { foodCreateReducer, FoodCreateState } from './food-create/food-create.reducer';
import { foodListReducer } from './food-list/food-list.reducer';

export interface FoodModuleState {
  foodCreate: FoodCreateState;
  foodList: null;
}

export const foodModuleReducer: ActionReducer<FoodModuleState, PayloadAction> = combineReducers({
  foodCreate: foodCreateReducer,
  foodList: foodListReducer
});

export const getFoodModuleState = createFeatureSelector<FoodModuleState>('food');

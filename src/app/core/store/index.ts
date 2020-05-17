import { ActionReducerMap, Action } from '@ngrx/store';
import { CoreState, coreReducer } from './core/core.reducer';
import { FoodState, foodReducer } from './food/food.reducer';

export interface AppState {
  core: CoreState;
  food: FoodState;
}

export interface PayloadAction extends Action {
  payload: any;
}

export const reducers: ActionReducerMap<AppState, PayloadAction> = {
  core: coreReducer,
  food: foodReducer
};

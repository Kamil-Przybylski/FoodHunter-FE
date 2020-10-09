import { ActionReducerMap, Action } from '@ngrx/store';
import { CoreState, coreReducer } from './core/core.reducer';
import { discoverReducer, DiscoverState } from './discover/discover.reducer';
import { FoodState, foodReducer } from './food/food.reducer';

export interface AppState {
  core: CoreState;
  discover: DiscoverState;
  food: FoodState;
}

export interface PayloadAction extends Action {
  payload: any;
}

export const reducers: ActionReducerMap<AppState, PayloadAction> = {
  core: coreReducer,
  discover: discoverReducer,
  food: foodReducer
};

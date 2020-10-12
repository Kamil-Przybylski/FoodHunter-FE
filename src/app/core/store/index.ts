import { ActionReducerMap, Action } from '@ngrx/store';
import { accountModuleReducer, AccountModuleState } from './account/account.reducer';
import { commentReducer } from './comment/comment.reducer';
import { CoreState, coreReducer } from './core/core.reducer';
import { discoverModuleReducer, DiscoverModuleState } from './discover/discover.reducer';
import { foodModuleReducer, FoodModuleState } from './food/food.reducer';

export interface AppState {
  core: CoreState;
  discover: DiscoverModuleState;
  food: FoodModuleState;
  comment: null;
  account: AccountModuleState;
}

export interface PayloadAction extends Action {
  payload: any;
}

export const reducers: ActionReducerMap<AppState, PayloadAction> = {
  core: coreReducer,
  discover: discoverModuleReducer,
  food: foodModuleReducer,
  comment: commentReducer,
  account: accountModuleReducer,
};

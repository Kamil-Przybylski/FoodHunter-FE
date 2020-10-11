import { ActionReducerMap, Action } from '@ngrx/store';
import { accountMduleReducer, AccountModuleState } from './account/account.reducer';
import { commentReducer } from './comment/comment.reducer';
import { CoreState, coreReducer } from './core/core.reducer';
import { discoverReducer, DiscoverState } from './discover/discover.reducer';
import { FoodState, foodReducer } from './food/food.reducer';

export interface AppState {
  core: CoreState;
  discover: DiscoverState;
  food: FoodState;
  comment: null;
  account: AccountModuleState;
}

export interface PayloadAction extends Action {
  payload: any;
}

export const reducers: ActionReducerMap<AppState, PayloadAction> = {
  core: coreReducer,
  discover: discoverReducer,
  food: foodReducer,
  comment: commentReducer,
  account: accountMduleReducer,
};

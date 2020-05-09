import { ActionReducerMap, Action } from '@ngrx/store';
import { CoreState, coreReducer } from './core/core.reducer';

export interface AppState {
  core: CoreState;
}

export interface PayloadAction extends Action {
  payload: any;
}

export const reducers: ActionReducerMap<AppState, PayloadAction> = {
  core: coreReducer
};

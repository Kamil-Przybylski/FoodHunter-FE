import { ActionReducer, combineReducers, createFeatureSelector } from '@ngrx/store';
import { PayloadAction } from '..';
import { accountUserReducer } from './account-user/account-user.reducer';

export interface AccountModuleState {
  accountUser: null;
}

export const accountMduleReducer: ActionReducer<AccountModuleState, PayloadAction> = combineReducers({
  accountUser: accountUserReducer,
});

export const getPrzychodyModuleState = createFeatureSelector<AccountModuleState>('account');

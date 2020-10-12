import { ActionReducer, combineReducers, createFeatureSelector } from '@ngrx/store';
import { PayloadAction } from '..';
import { accountUserReducer, AccountUserState } from './account-user/account-user.reducer';

export interface AccountModuleState {
  accountUser: AccountUserState;
}

export const accountModuleReducer: ActionReducer<AccountModuleState, PayloadAction> = combineReducers({
  accountUser: accountUserReducer,
});

export const getAccountModuleState = createFeatureSelector<AccountModuleState>('account');

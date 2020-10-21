import { ActionReducer, combineReducers, createFeatureSelector } from '@ngrx/store';
import { PayloadAction } from '..';
import { accountFollowersReducer, AccountFollowersState } from './account-followers/account-followers.reducer';
import { accountUserReducer, AccountUserState } from './account-user/account-user.reducer';

export interface AccountModuleState {
  accountUser: AccountUserState;
  accountFollowers: AccountFollowersState;
}

export const accountModuleReducer: ActionReducer<AccountModuleState, PayloadAction> = combineReducers({
  accountUser: accountUserReducer,
  accountFollowers: accountFollowersReducer
});

export const getAccountModuleState = createFeatureSelector<AccountModuleState>('account');

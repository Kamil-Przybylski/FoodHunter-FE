import { ActionReducer, combineReducers, createFeatureSelector } from '@ngrx/store';
import { PayloadAction } from '..';
import { accountFollowersReducer, AccountFollowersState } from './account-followers/account-followers.reducer';
import { accountFoodReducer, AccountFoodState } from './account-food/account-food.reducer';
import { accountUserReducer, AccountUserState } from './account-user/account-user.reducer';

export interface AccountModuleState {
  accountUser: AccountUserState;
  accountFollowers: AccountFollowersState;
  accountFood: AccountFoodState;
}

export const accountModuleReducer: ActionReducer<AccountModuleState, PayloadAction> = combineReducers({
  accountUser: accountUserReducer,
  accountFollowers: accountFollowersReducer,
  accountFood: accountFoodReducer
});

export const getAccountModuleState = createFeatureSelector<AccountModuleState>('account');

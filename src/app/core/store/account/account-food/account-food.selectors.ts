import { createSelector } from '@ngrx/store';
import { getAccountModuleState } from '../account.reducer';

export const getAccountFoodState = createSelector(getAccountModuleState, (state) => state.accountFood);

export const getAccountFoodPaginator = createSelector(getAccountFoodState, (state) => state.paginator);

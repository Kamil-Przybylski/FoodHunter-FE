import { ActionReducer, combineReducers, createFeatureSelector } from '@ngrx/store';
import { PayloadAction } from '..';
import { discoverListReducer, DiscoverListState } from './discover-list/discover-list.reducer';

export interface DiscoverModuleState {
  discoverList: DiscoverListState;
}

export const discoverModuleReducer: ActionReducer<DiscoverModuleState, PayloadAction> = combineReducers({
  discoverList: discoverListReducer,
});

export const getDiscoverModuleState = createFeatureSelector<DiscoverModuleState>('discover');

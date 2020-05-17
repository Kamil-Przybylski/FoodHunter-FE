import { combineReducers, createFeatureSelector } from '@ngrx/store';
import { PayloadAction } from '..';
import {
  getDataConditionReducer,
  DataConditionState,
} from './data-condition/data-condition.reducer';
import { AuthState, authReducer } from './auth/auth.reducer';
import { EntitiesState } from './entities/entities.models';
import { getEntitesReducer } from './entities/entities.reducer';
import { LayoutState, layoutReducer } from './layout/layout.reducer';

export interface CoreState {
  entities: EntitiesState;
  dataCondition: DataConditionState;
  auth: AuthState;
  layout: LayoutState;
}

export const coreReducer = combineReducers<CoreState, PayloadAction>({
  entities: getEntitesReducer(),
  dataCondition: getDataConditionReducer(),
  auth: authReducer,
  layout: layoutReducer
});

export const getCoreModuleState = createFeatureSelector<CoreState>('core');

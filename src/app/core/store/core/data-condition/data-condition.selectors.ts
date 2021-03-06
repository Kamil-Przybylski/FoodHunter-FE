import { getCoreModuleState } from './../core.reducer';
import { createSelector } from '@ngrx/store';
import { HttpState } from './data-condition.reducer';
import { EntitiesEnum } from '../entities/entities.models';

export const getDataConditionState = createSelector(
  getCoreModuleState,
  state => state.dataCondition
);

export const getDataCondition = <T, P>(key: EntitiesEnum, entityId: number) => createSelector(
  getDataConditionState,
  state => state && state[key] && state[key][entityId] as HttpState<T, P>
);

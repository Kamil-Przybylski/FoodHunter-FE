import { getCoreModuleState } from './../core.reducer';
import { createSelector } from '@ngrx/store';
import { HttpState } from './data-condition.reducer';
import { EntitiesEnum } from '../entities/entities.models';

export const getDataConditionState = createSelector(getCoreModuleState, (state) => state.dataCondition);

export const getDataCondition = <T, P>(key: EntitiesEnum, entityId: number | string) =>
  createSelector(getDataConditionState, (state) => state?.[key]?.[entityId] as HttpState<T, P>);

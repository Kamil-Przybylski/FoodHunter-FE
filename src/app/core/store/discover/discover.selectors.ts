import { HttpPaginatorMeta } from '@core/models/custom-http.models';
import { createSelector } from '@ngrx/store';
import { getDataCondition } from '../core/data-condition/data-condition.selectors';
import { EntitiesEnum } from '../core/entities/entities.models';
import { getEntitiesSelectAll } from '../core/entities/entities.selectors';
import { getDiscoverModuleState } from './discover.reducer';

export const getDiscoverState = createSelector(getDiscoverModuleState, (discoverState) => discoverState);

export const getDiscoverDataConditionLoadData = createSelector(
  getDataCondition(EntitiesEnum.FOOD, 0),
  state => state && state.loadData as HttpPaginatorMeta
);

export const getDiscoverPaginator = createSelector(getDiscoverState, (discoverState) => discoverState.paginator);

export const getDiscoverAllFoods = createSelector(getEntitiesSelectAll(EntitiesEnum.FOOD), (all) => all);

import { HttpPaginatorMeta } from '@core/models/custom-http.models';
import { createSelector } from '@ngrx/store';
import * as _ from 'lodash';
import { getDataCondition } from '@core/store/core/data-condition/data-condition.selectors';
import { EntitiesEnum } from '@core/store/core/entities/entities.models';
import { getEntitiesSelectAll } from '@core/store/core/entities/entities.selectors';
import { getDiscoverModuleState } from '../discover.reducer';

export const getDiscoverListState = createSelector(getDiscoverModuleState, (discoverState) => discoverState.discoverList);

export const getDiscoverListDataConditionLoadData = createSelector(
  getDataCondition(EntitiesEnum.FOOD, 0),
  (state) => state && (state.loadData as HttpPaginatorMeta)
);

export const getDiscoverListPaginator = createSelector(getDiscoverListState, (discoverState) => discoverState.paginator);

export const getDiscoverListAllFoods = createSelector(getEntitiesSelectAll(EntitiesEnum.FOOD), (all) =>
  _.sortBy(all, (item) => item.createDate).reverse()
);

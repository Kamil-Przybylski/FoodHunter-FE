import { HttpPaginatorMeta } from '@core/models/custom-http.models';
import { getDataCondition } from '@core/store/core/data-condition/data-condition.selectors';
import { EntitiesEnum } from '@core/store/core/entities/entities.models';
import { getEntitiesSelectEntities } from '@core/store/core/entities/entities.selectors';
import { createSelector } from '@ngrx/store';
import * as _ from 'lodash';
import { getFoodModuleState } from '../food.reducer';

export const getFoodListState = createSelector(getFoodModuleState, (state) => state.foodList);

export const getFoodListDataConditionEntityIds = (userId: number) =>
  createSelector(
    getDataCondition(EntitiesEnum.FOOD, `user-${userId}`),
    (state) => state?.entityIds
  );

export const getFoodListDataConditionLoadData = (userId: number) =>
  createSelector(
    getDataCondition(EntitiesEnum.FOOD, `user-${userId}`),
    (state) => state?.loadData as HttpPaginatorMeta
  );

export const getFoodListPaginator = createSelector(getFoodListState, (state) => state.paginator);

export const getFoodListUserFoods = (userId: number) => createSelector(
  getEntitiesSelectEntities(EntitiesEnum.FOOD),
  getFoodListDataConditionEntityIds(userId),
  (entities, ids) => {
    const foods = _.map(ids, id => entities[id]);
    return _.sortBy(foods, (item) => item.createDate).reverse()
  }
);

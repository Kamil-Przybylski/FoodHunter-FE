import { HttpPaginatorMeta } from '@core/models/custom-http.models';
import { getDataCondition } from '@core/store/core/data-condition/data-condition.selectors';
import { EntitiesEnum } from '@core/store/core/entities/entities.models';
import { getEntitiesByDataConditionIds, getEntitiesSelectEntities } from '@core/store/core/entities/entities.selectors';
import { createSelector } from '@ngrx/store';
import * as _ from 'lodash';
import { getFoodModuleState } from '../food.reducer';

export const getFoodListState = createSelector(getFoodModuleState, (state) => state.foodList);

export const getFoodListDataConditionLoadData = (userId: number) =>
  createSelector(
    getDataCondition(EntitiesEnum.FOOD, `user-${userId}`),
    (state) => state?.loadData as HttpPaginatorMeta
  );

export const getFoodListDashboardFoods = createSelector(getEntitiesByDataConditionIds(EntitiesEnum.FOOD, 0), (foods) =>
  _.sortBy(foods, (item) => item.createDate).reverse()
);

export const getFoodListUserFoods = (userId: number) =>
  createSelector(getEntitiesByDataConditionIds(EntitiesEnum.FOOD, `user-${userId}`), (foods) =>
    _.sortBy(foods, (item) => item.createDate).reverse()
  );

export const getFoodListSingleFood = (foodId: number) =>
  createSelector(getEntitiesSelectEntities(EntitiesEnum.FOOD), (entities) => entities[foodId]);

import { createSelector } from '@ngrx/store';
import * as _ from 'lodash';
import { EntitiesEnum } from '../core/entities/entities.models';
import { getEntitiesByDataConditionIds } from '../core/entities/entities.selectors';

export const getCommentsByFoodId = (foodId: number) =>
  createSelector(getEntitiesByDataConditionIds(EntitiesEnum.COMMENT, foodId), (comments) =>
    _.sortBy(comments, (item) => item.createDate).reverse()
  );

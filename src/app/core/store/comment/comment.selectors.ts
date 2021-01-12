import { createSelector } from '@ngrx/store';
import * as _ from 'lodash';
import { EntitiesEnum } from '../core/entities/entities.models';
import { getAllEntitiesByDataConditionIds } from '../core/entities/entities.selectors';

export const getCommentsByFoodId = (foodId: number) =>
  createSelector(getAllEntitiesByDataConditionIds(EntitiesEnum.COMMENT, foodId), (comments) =>
    _.sortBy(comments, (item) => item.createDate).reverse()
  );

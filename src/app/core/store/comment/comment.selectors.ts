import { createSelector } from '@ngrx/store';
import * as _ from 'lodash';
import { getDataCondition } from '../core/data-condition/data-condition.selectors';
import { EntitiesEnum } from '../core/entities/entities.models';
import { getEntitiesSelectEntities } from '../core/entities/entities.selectors';

export const getCommentsByFoodId = (foodId: number) =>
  createSelector(
    getEntitiesSelectEntities(EntitiesEnum.COMMENT),
    getDataCondition(EntitiesEnum.COMMENT, foodId),
    (comments, dataCondition) => {
      const selectedComments = _.map(dataCondition.entityIds || [], (id) => comments[id]);
      return _.sortBy(selectedComments, (item) => item.createDate).reverse();
    }
  );

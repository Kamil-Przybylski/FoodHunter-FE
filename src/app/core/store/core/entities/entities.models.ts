import { EntityState } from '@ngrx/entity';
import { ActionReducer } from '@ngrx/store';
import { User, UserShort } from '@core/models/user.models';
import { Food } from '@core/models/food.models';
import { FoodTag } from '@core/models/food-tags.models';
import { FoodType } from '@core/models/food-types.models';
import { Comments } from '@core/models/comment.model';

export enum EntitiesEnum {
  FOOD = 'foodEntities',
  FOOD_TYPE = 'foodTypeEntities',
  FOOD_TAG = 'foodTagEntities',

  COMMENT = 'comment',
  // RESTAURANT = 'restaurantEntities',
  // CATALOG = 'catalogEntities',
  USER_SHORT = 'userShortEntities',
  USER = 'userEntities',
}

export interface EntitiesStateComponents {
  [EntitiesEnum.FOOD]: Food;
  [EntitiesEnum.FOOD_TYPE]: FoodType;
  [EntitiesEnum.FOOD_TAG]: FoodTag;

  [EntitiesEnum.COMMENT]: Comments;

  [EntitiesEnum.USER_SHORT]: UserShort;
  [EntitiesEnum.USER]: User;
}

export type EntitiesState = {
  [P in keyof EntitiesStateComponents]: EntityState<EntitiesStateComponents[P]>
};

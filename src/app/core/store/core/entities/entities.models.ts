import { EntityState } from '@ngrx/entity';
import { ActionReducer } from '@ngrx/store';
import { ResFoodDto } from '@core/models/food.models';
import { ResFoodTypesDto } from '@core/models/food-types.models';
import { ResFoodTagsDto } from '@core/models/food-tags.models';

export enum EntitiesEnum {
  FOOD = 'foodEntities',
  FOOD_TYPE = 'foodTypeEntities',
  FOOD_TAG = 'foodTagEntities',
  // RESTAURANT = 'restaurantEntities',
  // CATALOG = 'catalogEntities',
  // USER = 'userEntities',
}

export interface EntitiesStateComponents {
  [EntitiesEnum.FOOD]: ResFoodDto;
  [EntitiesEnum.FOOD_TYPE]: ResFoodTypesDto;
  [EntitiesEnum.FOOD_TAG]: ResFoodTagsDto;
}

export type EntitiesTypes = EntitiesStateComponents[keyof EntitiesStateComponents];

export type EntitiesState = {
  [P in keyof EntitiesStateComponents]: EntitiesStateComponents[P]
};

export type State = {
  [P in keyof EntitiesStateComponents]: EntityState<EntitiesStateComponents[P]>
};

export type Reducer = ActionReducer<{
  [P in keyof EntitiesState]: EntityState<EntitiesState[P]>
}>;

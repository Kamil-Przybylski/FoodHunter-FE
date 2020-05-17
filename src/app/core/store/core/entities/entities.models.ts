import { EntityState } from '@ngrx/entity';
import { ActionReducer } from '@ngrx/store';
import { ResFoodDto } from '@core/models/food.models';

export enum EntitiesEnum {
  FOOD = 'foodEntities',
  // TAG = 'tagEntities',
  // FOOD_TYPE = 'foodTypeEntities',
  // RESTAURANT = 'restaurantEntities',
  // CATALOG = 'catalogEntities',
  // USER = 'userEntities',
}

export interface EntitiesStateComponents {
  [EntitiesEnum.FOOD]: ResFoodDto;
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

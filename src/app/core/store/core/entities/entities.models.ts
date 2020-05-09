import { EntitiesTemp, Food } from 'src/app/core/models/food.models';
import { EntityState, EntityAdapter } from '@ngrx/entity';
import { ActionReducer } from '@ngrx/store';

export interface EntitiesStateComponents {
  foodEntities: Food;
  tagEntities: EntitiesTemp;
  foodTypeEntities: EntitiesTemp;
  restaurantEntities: EntitiesTemp;
  catalogEntities: EntitiesTemp;
  userEntities: EntitiesTemp;
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


import * as entitiesActions from './entities.actions';
import * as _ from 'lodash';
import { combineReducers, createReducer, on, ActionReducer } from '@ngrx/store';
import { EntitiesEnum } from './entities.enum';
import { EntityAdapter, createEntityAdapter, EntityState } from '@ngrx/entity';
import { Food } from 'src/app/core/models/food.models';
import { PayloadAction } from '../..';

export interface EntitiesStateComponents {
  foodEntities: Food;
  tagEntities: any;
  foodTypeEntities: any;
  restaurantEntities: any;
  catalogEntities: any;
  userEntities: any;
}
export type EntitiesState = {
  [P in keyof EntitiesStateComponents]: EntitiesStateComponents[P];
};
interface AdaptersType {
  [type: string]: EntityAdapter<any>;
}

const getAdapters = (): AdaptersType => {
  const adapterFactory = {} as any;
  _.forEach(EntitiesEnum, (key) => {
    adapterFactory[key] = createEntityAdapter();
  });
  return adapterFactory;
};
const adapters = getAdapters();

const creaateEntitiesReducer = (type: EntitiesEnum) => {
  const adapter = adapters[type];
  return createReducer(
    adapter.getInitialState(),
    on(entitiesActions.addOneAction(), (state, { key, entity }) => {
      if (key === type) return adapter.addOne(entity, state);
      else return state;
    }),
    on(entitiesActions.addManyAction(), (state, { key, entities }) => {
      if (key === type) return adapter.addMany(entities, state);
      else return state;
    }),
    on(entitiesActions.addAllAction(), (state, { key, entities }) => {
      if (key === type) return adapter.addAll(entities, state);
      else return state;
    }),
    on(entitiesActions.removeOneAction(), (state, { key, id }) => {
      if (key === type) return adapter.removeOne(id, state);
      else return state;
    }),
    on(entitiesActions.removeManyAction(), (state, { key, ids }) => {
      if (key === type) return adapter.removeMany(ids, state);
      else return state;
    }),
    on(entitiesActions.removeAllAction(), (state, { key }) => {
      if (key === type) return adapter.removeAll(state);
      else return state;
    }),
    on(entitiesActions.updateOneAction(), (state, { key, entity }) => {
      if (key === type) return adapter.updateOne(entity, state);
      else return state;
    }),
    on(entitiesActions.updateManyAction(), (state, { key, entities }) => {
      if (key === type) return adapter.updateMany(entities, state);
      else return state;
    }),
    on(entitiesActions.upsertOneAction(), (state, { key, entity }) => {
      if (key === type) return adapter.upsertOne(entity, state);
      else return state;
    }),
    on(entitiesActions.upsertManyAction(), (state, { key, entities }) => {
      if (key === type) return adapter.upsertMany(entities, state);
      else return state;
    })
  );
};

export const getEntitesReducer = (): ActionReducer<
  EntitiesState,
  PayloadAction
> => {
  const reducerFactory = {} as any;
  _.forEach(EntitiesEnum, (key) => {
    reducerFactory[key] = creaateEntitiesReducer(key);
  });
  return combineReducers(reducerFactory);
};

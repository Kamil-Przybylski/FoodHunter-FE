import { createAction, props } from '@ngrx/store';
import { EntitiesStateComponents } from './entities.models';
import * as entityModels from './entities.models';
import { Update } from '@ngrx/entity';

export const addOneAction = <T extends keyof EntitiesStateComponents>() =>
  createAction(
    '[Entities] Add One',
    props<{ key: T; entity: entityModels.EntitiesStateComponents[T] }>()
  );

export const addManyAction = <T extends keyof EntitiesStateComponents>() =>
  createAction(
    '[Entities] Add Many',
    props<{ key: T; entities: entityModels.EntitiesStateComponents[T][] }>()
  );

export const addAllAction = <T extends keyof EntitiesStateComponents>() =>
  createAction(
    '[Entities] Add All',
    props<{ key: T; entities: entityModels.EntitiesStateComponents[T][] }>()
  );

export const removeOneAction = <T extends keyof EntitiesStateComponents>() =>
  createAction('[Entities] Remove One', props<{ key: T; id: number }>());

export const removeManyAction = <T extends keyof EntitiesStateComponents>() =>
  createAction('[Entities] Remove Many', props<{ key: T; ids: number[] }>());

export const removeAllAction = <T extends keyof EntitiesStateComponents>() =>
  createAction('[Entities] Remove All', props<{ key: T }>());

export const updateOneAction = <T extends keyof EntitiesStateComponents>() =>
  createAction(
    '[Entities] Update One',
    props<{ key: T; entity: Update<entityModels.EntitiesStateComponents[T]> }>()
  );

export const updateManyAction = <T extends keyof EntitiesStateComponents>() =>
  createAction(
    '[Entities] Update Many',
    props<{ key: T; entities: Update<entityModels.EntitiesStateComponents[T]>[] }>()
  );

export const upsertOneAction = <T extends keyof EntitiesStateComponents>() =>
  createAction(
    '[Entities] Upsert One',
    props<{ key: T; entity: entityModels.EntitiesStateComponents[T] }>()
  );

export const upsertManyAction = <T extends keyof EntitiesStateComponents>() =>
  createAction(
    '[Entities] Upsert Many',
    props<{ key: T; entities: entityModels.EntitiesStateComponents[T][] }>()
  );

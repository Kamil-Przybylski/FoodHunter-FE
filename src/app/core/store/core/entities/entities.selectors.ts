import { EntitiesStateComponents, EntitiesEnum } from './entities.models';
import { EntitySelectors } from '@ngrx/entity/src/models';
import { createSelector } from '@ngrx/store';
import { getCoreModuleState } from '../core.reducer';
import { adapters } from './entities.reducer';

export const getEntitiesState = createSelector(
  getCoreModuleState,
  (state) => state.entities
);

const getEntityState = (type: EntitiesEnum) =>
  createSelector(getEntitiesState, (state) => state[type]);

export const getSelectors = <T extends keyof EntitiesStateComponents>(
  type: EntitiesEnum
) =>
  adapters[type].getSelectors() as EntitySelectors<
    EntitiesStateComponents[T],
    any
  >;

export const getEntitiesSelectIds = <T extends keyof EntitiesStateComponents>(
  type: T
) =>
  createSelector(getEntityState(type), getSelectors<T>(type).selectIds);

export const getEntitiesSelectEntities = <
  T extends keyof EntitiesStateComponents
>(
  type: T
) =>
  createSelector(
    getEntityState(type),
    getSelectors<T>(type).selectEntities
  );

export const getEntitiesSelectAll = <T extends keyof EntitiesStateComponents>(
  type: T
) => createSelector(getEntityState(type), getSelectors<T>(type).selectAll);

export const getEntitiesSelectTotal = <T extends keyof EntitiesStateComponents>(
  type: T
) =>
  createSelector(getEntityState(type), getSelectors<T>(type).selectTotal);

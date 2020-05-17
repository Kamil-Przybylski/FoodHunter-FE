import { EntityState } from '@ngrx/entity';
import {
  combineReducers,
  ActionReducer,
  Action,
  createReducer,
  on,
} from '@ngrx/store';
import * as dataConditionActions from './data-condition.actions';
import * as _ from 'lodash';
import { EntitiesStateComponents, EntitiesEnum } from '../entities/entities.models';
import { PayloadAction } from '../..';
import { HttpErrorResDto } from '@core/models/custom-http.models';

export interface HttpState<T, P> {
  isLoading: boolean;
  isLoadSuccess: boolean;
  isRefreshing: boolean;
  isRefreshSuccess: boolean;
  entityIds: number[];
  loadData: T;
  loadErrors: HttpErrorResDto;
  refreshErrors: HttpErrorResDto;

  isSending: boolean;
  isSendSuccess: boolean;
  sendData: P;
  sendErrors: HttpErrorResDto;
}

export type DataConditionState = {
  [P in keyof EntitiesStateComponents]: { [id: number]: HttpState<any, any> };
};

export const initialState: HttpState<any, any> = {
  isLoading: false,
  isLoadSuccess: false,
  isRefreshing: false,
  isRefreshSuccess: false,
  entityIds: [],
  loadData: null,
  loadErrors: null,
  refreshErrors: null,

  isSending: false,
  isSendSuccess: false,
  sendData: null,
  sendErrors: null,
};

const ReducerTypes = {
  DOWNLOAD: (state: HttpState<any, any>): HttpState<any, any> =>
    _.assign({}, state, {
      isLoading: true,
      isLoadSuccess: false,
      loadErrors: null,
    } as HttpState<any, any>),
  DOWNLOAD_SUCCESS: (
    state: HttpState<any, any>,
    entityIds: number[],
    loadData
  ): HttpState<any, any> =>
    _.assign({}, state, {
      isLoading: false,
      isLoadSuccess: true,
      loadErrors: null,
      entityIds: entityIds,
      loadData: loadData,
    } as HttpState<any, any>),
  DOWNLOAD_FAIL: (state: HttpState<any, any>, error): HttpState<any, any> =>
    _.assign({}, state, {
      isLoading: false,
      isLoadSuccess: false,
      loadErrors: error,
    } as HttpState<any, any>),

  REFRESH: (state: HttpState<any, any>): HttpState<any, any> =>
    _.assign({}, state, {
      isRefreshing: true,
      isRefreshSuccess: false,
      refreshErrors: null,
    } as HttpState<any, any>),
  REFRESH_SUCCESS: (
    state: HttpState<any, any>,
    loadData
  ): HttpState<any, any> =>
    _.assign({}, state, {
      isRefreshing: false,
      isRefreshSuccess: true,
      refreshErrors: null,
      loadData: loadData,
    } as HttpState<any, any>),
  REFRESH_FAIL: (state: HttpState<any, any>, error): HttpState<any, any> =>
    _.assign({}, state, {
      isRefreshing: false,
      isRefreshSuccess: false,
      refreshErrors: error,
    } as HttpState<any, any>),

  SEND: (state: HttpState<any, any>): HttpState<any, any> =>
    _.assign({}, state, {
      isSending: true,
      isSendSuccess: false,
      sendErrors: null,
    } as HttpState<any, any>),
  SEND_SUCCESS: (
    state: HttpState<any, any>,
    entityIds: number[],
    sendData
  ): HttpState<any, any> =>
    _.assign({}, state, {
      isSending: false,
      isSendSuccess: true,
      sendErrors: null,
      entityIds: entityIds
        ? _.union(state.entityIds, entityIds)
        : state.entityIds,
      sendData: sendData,
    } as HttpState<any, any>),
  SEND_FAIL: (state: HttpState<any, any>, error): HttpState<any, any> =>
    _.assign({}, state, {
      isSending: false,
      isSendSuccess: false,
      sendErrors: error,
    } as HttpState<any, any>),

  CLEAR: <T>(state: T): T => _.assign({}, state, initialState),
};

const getDataConditionState = (state: any, dataId: number, fn: (st) => any) => {
  if (state[dataId]) {
    const newState = _.assign({}, state);
    newState[dataId] = fn(newState[dataId]);
    return newState;
  } else {
    const newState = _.assign({}, state, {
      [dataId]: { ...initialState },
    });
    newState[dataId] = fn(newState[dataId]);
    return newState;
  }
};

const createDataReducer = (
  type: keyof EntitiesStateComponents
): ActionReducer<EntityState<any>, Action> => {
  return createReducer(
    {} as any,
    on(
      dataConditionActions.downloadAction(),
      dataConditionActions.switchDownloadAction(),
      (state, { key, dataId }) => {
        if (key === type)
          return getDataConditionState(state, dataId, (st) => {
            return ReducerTypes.DOWNLOAD(st);
          });
        else return state;
      }
    ),
    on(
      dataConditionActions.downloadSuccessAction(),
      (state, { key, dataId, entityIds, loadData }) => {
        if (key === type)
          return getDataConditionState(state, dataId, (st) => {
            return ReducerTypes.DOWNLOAD_SUCCESS(st, entityIds, loadData);
          });
        else return state;
      }
    ),
    on(
      dataConditionActions.downloadFailAction(),
      (state, { key, dataId, error }) => {
        if (key === type)
          return getDataConditionState(state, dataId, (st) => {
            return ReducerTypes.DOWNLOAD_FAIL(st, error);
          });
        else return state;
      }
    ),
    on(dataConditionActions.saveAction(), (state, { key, dataId }) => {
      if (key === type)
        return getDataConditionState(state, dataId, (st) => {
          return ReducerTypes.SEND(st);
        });
      else return state;
    }),
    on(
      dataConditionActions.saveSuccessAction(),
      (state, { key, dataId, entityIds, sendData }) => {
        if (key === type)
          return getDataConditionState(state, dataId, (st) => {
            return ReducerTypes.SEND_SUCCESS(st, entityIds, sendData);
          });
        else return state;
      }
    ),
    on(
      dataConditionActions.saveFailAction(),
      (state, { key, dataId, error }) => {
        if (key === type)
          return getDataConditionState(state, dataId, (st) => {
            return ReducerTypes.SEND_FAIL(st, error);
          });
        else return state;
      }
    ),

    on(dataConditionActions.clearAction(), (state, { key, dataId }) => {
      if (key === type)
        return getDataConditionState(state, dataId, (st) => {
          return ReducerTypes.CLEAR(st);
        });
      else return state;
    })
  );
};

export const getDataConditionReducer = (): ActionReducer<
  DataConditionState,
  PayloadAction
> => {
  const reducerFactory = {} as any;
  _.forEach(EntitiesEnum, (key) => {
    reducerFactory[key] = createDataReducer(key);
  });
  return combineReducers(reducerFactory);
};

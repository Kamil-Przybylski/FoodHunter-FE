import { EntityState } from '@ngrx/entity';
import {
  combineReducers,
  ActionReducer,
  Action,
  createReducer,
  on,
} from '@ngrx/store';
import { EntitiesEnum } from './../entities/entities.enum';
import * as dataConditionActions from './data-condition.actions';
import * as _ from 'lodash';
import { EntitiesStateComponents } from '../entities/entities.models';
import { HttpErrorResponse } from '@angular/common/http';
import { PayloadAction } from '../..';

export interface HttpState<T, P> {
  isLoading: boolean;
  isLoadSuccess: boolean;
  isRefreshing: boolean;
  isRefreshSuccess: boolean;
  loadData: T;
  loadErrors: HttpErrorResponse;
  refreshErrors: HttpErrorResponse;

  isSending: boolean;
  isSendSuccess: boolean;
  sendData: P;
  sendErrors: HttpErrorResponse;
}

export type DataConditionState = {
  [P in keyof EntitiesStateComponents]: { [id: number]: HttpState<any, any> };
};


export const initialState: HttpState<any, any> = {
  isLoading: false,
  isLoadSuccess: false,
  isRefreshing: false,
  isRefreshSuccess: false,
  loadData: null,
  loadErrors: null,
  refreshErrors: null,

  isSending: false,
  isSendSuccess: false,
  sendData: null,
  sendErrors: null,
};

const ReducerTypes = {
  DOWNLOAD: <T>(state: T): T =>
    _.assign({}, state, {
      isLoading: true,
      isLoadSuccess: false,
      loadErrors: null,
    } as HttpState<any, any>),
  DOWNLOAD_SUCCESS: <T>(state: T, loadData): T =>
    _.assign({}, state, {
      isLoading: false,
      isLoadSuccess: true,
      loadErrors: null,
      loadData: loadData,
    } as HttpState<any, any>),
  DOWNLOAD_FAIL: <T>(state: T, error): T =>
    _.assign({}, state, {
      isLoading: false,
      isLoadSuccess: false,
      loadErrors: error,
    } as HttpState<any, any>),

  REFRESH: <T>(state: T): T =>
    _.assign({}, state, {
      isRefreshing: true,
      isRefreshSuccess: false,
      refreshErrors: null,
    } as HttpState<any, any>),
  REFRESH_SUCCESS: <T>(state: T, loadData): T =>
    _.assign({}, state, {
      isRefreshing: false,
      isRefreshSuccess: true,
      refreshErrors: null,
      loadData: loadData,
    } as HttpState<any, any>),
  REFRESH_FAIL: <T>(state: T, error): T =>
    _.assign({}, state, {
      isRefreshing: false,
      isRefreshSuccess: false,
      refreshErrors: error,
    } as HttpState<any, any>),

  SEND: <T>(state: T): T =>
    _.assign({}, state, {
      isSending: true,
      isSendSuccess: false,
      sendErrors: null,
    } as HttpState<any, any>),
  SEND_SUCCESS: <T>(state: T, sendData): T =>
    _.assign({}, state, {
      isSending: false,
      isSendSuccess: true,
      sendErrors: null,
      sendData: sendData,
    } as HttpState<any, any>),
  SEND_FAIL: <T>(state: T, error): T =>
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
      (state, { key, dataId, loadData }) => {
        if (key === type)
          return getDataConditionState(state, dataId, (st) => {
            return ReducerTypes.DOWNLOAD_SUCCESS(st, loadData);
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
    on(
      dataConditionActions.saveAction(),
      dataConditionActions.saveUpdateAction(),
      (state, { key, dataId }) => {
        if (key === type)
          return getDataConditionState(state, dataId, (st) => {
            return ReducerTypes.SEND(st);
          });
        else return state;
      }
    ),
    on(
      dataConditionActions.saveSuccessAction(),
      (state, { key, dataId, sendData }) => {
        if (key === type)
          return getDataConditionState(state, dataId, (st) => {
            return ReducerTypes.SEND_SUCCESS(st, sendData);
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

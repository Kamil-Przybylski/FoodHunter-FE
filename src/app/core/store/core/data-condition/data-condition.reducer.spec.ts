import { Action, ActionReducer } from '@ngrx/store';
import * as _ from 'lodash';
import { of } from 'rxjs';
import { mockData, mockDataConditionInitialState } from 'tests/unit-tests.mock';
import { EntitiesEnum } from '../entities/entities.models';
import {
  clearAction,
  downloadAction,
  downloadFailAction,
  downloadSuccessAction,
  saveAction,
  saveFailAction,
  saveSuccessAction,
} from './data-condition.actions';
import { DataConditionState, getDataConditionReducer, HttpState, initialState } from './data-condition.reducer';

describe('data-condition.reducer.ts', () => {
  let reducer: ActionReducer<DataConditionState, Action>;
  let initialDataConditionState: DataConditionState;
  let initialHttpState: HttpState<any, any>;
  let expectedState: DataConditionState;

  beforeEach(() => {
    reducer = getDataConditionReducer();
    initialDataConditionState = mockDataConditionInitialState();
    initialHttpState = _.cloneDeep(initialState);
    expectedState = _.cloneDeep(initialDataConditionState);
  });

  it('should correctly return DOWNLOAD state for FOOD entities', () => {
    const action = downloadAction()({
      key: EntitiesEnum.FOOD,
      dataId: 0,
      requestObservable: of([mockData.FOODS.FOOD_1]),
    });
    const state = reducer(initialDataConditionState, action);

    expectedState[EntitiesEnum.FOOD][0] = initialHttpState;
    expectedState[EntitiesEnum.FOOD][0].isLoading = true;

    expect(state).toEqual(expectedState);
  });

  it('should correctly return DOWNLOAD SUCCESS state for FOOD entities', () => {
    const loadData = { example: 'test' };
    const action = downloadSuccessAction()({
      key: EntitiesEnum.FOOD,
      dataId: 0,
      entityIds: [2],
      loadData: loadData,
    });
    const state = reducer(initialDataConditionState, action);

    expectedState[EntitiesEnum.FOOD][0] = initialHttpState;
    expectedState[EntitiesEnum.FOOD][0].isLoadSuccess = true;
    expectedState[EntitiesEnum.FOOD][0].entityIds = [2];
    expectedState[EntitiesEnum.FOOD][0].loadData = loadData;
    expect(state).toEqual(expectedState);
  });

  it('should correctly return DOWNLOAD FAIL state for FOOD entities', () => {
    const err = { error: 'er', message: 'msg', statusCode: 500 };
    const action = downloadFailAction()({
      key: EntitiesEnum.FOOD,
      dataId: 0,
      error: err,
    });
    const state = reducer(initialDataConditionState, action);

    expectedState[EntitiesEnum.FOOD][0] = initialHttpState;
    expectedState[EntitiesEnum.FOOD][0].loadErrors = err;
    expect(state).toEqual(expectedState);
  });

  it('should correctly return SAVE state for FOOD entities', () => {
    const action = saveAction()({
      key: EntitiesEnum.FOOD,
      dataId: 0,
      requestObservable: of([mockData.FOODS.FOOD_1]),
    });
    const state = reducer(initialDataConditionState, action);

    expectedState[EntitiesEnum.FOOD][0] = initialHttpState;
    expectedState[EntitiesEnum.FOOD][0].isSending = true;
    expect(state).toEqual(expectedState);
  });

  it('should correctly return SAVE SUCCESS state for FOOD entities', () => {
    const sendData = { example: 'test' };
    const action = saveSuccessAction()({
      key: EntitiesEnum.FOOD,
      dataId: 0,
      entityIds: [2],
      sendData: sendData,
    });
    const state = reducer(initialDataConditionState, action);

    expectedState[EntitiesEnum.FOOD][0] = initialHttpState;
    expectedState[EntitiesEnum.FOOD][0].isSendSuccess = true;
    expectedState[EntitiesEnum.FOOD][0].entityIds = [2];
    expectedState[EntitiesEnum.FOOD][0].sendData = sendData;
    expect(state).toEqual(expectedState);
  });

  it('should correctly return SAVE FAIL state for FOOD entities', () => {
    const err = { error: 'er', message: 'msg', statusCode: 500 };
    const action = saveFailAction()({
      key: EntitiesEnum.FOOD,
      dataId: 0,
      error: err,
    });
    const state = reducer(initialDataConditionState, action);

    expectedState[EntitiesEnum.FOOD][0] = initialHttpState;
    expectedState[EntitiesEnum.FOOD][0].sendErrors = err;
    expect(state).toEqual(expectedState);
  });

  it('should correctly return CLEAR state for FOOD entities', () => {
    const action = clearAction()({
      key: EntitiesEnum.FOOD,
      dataId: 1,
    });
    initialDataConditionState[EntitiesEnum.FOOD][1] = _.cloneDeep(initialHttpState);
    initialDataConditionState[EntitiesEnum.FOOD][1].isLoadSuccess = true;
    initialDataConditionState[EntitiesEnum.FOOD][1].entityIds = [1, 2, 3];
    initialDataConditionState[EntitiesEnum.FOOD][1].loadData = { data: 'test' };
    const state = reducer(initialDataConditionState, action);

    expectedState[EntitiesEnum.FOOD][1] = initialHttpState;
    expect(state).toEqual(expectedState);
  });
});

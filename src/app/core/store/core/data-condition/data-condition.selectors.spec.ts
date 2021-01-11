import * as _ from 'lodash';
import { mockDataConditionInitialState } from 'tests/unit-tests.mock';
import { EntitiesEnum } from '../entities/entities.models';
import { DataConditionState, initialState } from './data-condition.reducer';
import { getDataCondition } from './data-condition.selectors';

describe('data-condition.selectors.ts', () => {
  let initialDataConditionState: DataConditionState;

  beforeEach(() => {
    initialDataConditionState = mockDataConditionInitialState();
  });

  it('should return FOOD condition state', () => {
    initialDataConditionState[EntitiesEnum.FOOD][1] = _.cloneDeep(initialState);
    initialDataConditionState[EntitiesEnum.FOOD][1].isSendSuccess = true;
    const state = getDataCondition(EntitiesEnum.FOOD, 1).projector(initialDataConditionState);

    const expectedState = _.cloneDeep(initialState);
    expectedState.isSendSuccess = true;
    expect(state).toEqual(expectedState);
  });
});

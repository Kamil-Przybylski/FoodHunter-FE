import { Action, ActionReducer } from '@ngrx/store';
import * as _ from 'lodash';
import { mockData, mockEntitiesInitialState } from 'tests/unit-tests.mock';
import {
  addAllAction,
  addManyAction,
  addOneAction,
  removeAllAction,
  removeManyAction,
  removeOneAction,
  updateManyAction,
  updateOneAction,
  upsertManyAction,
  upsertOneAction,
} from './entities.actions';
import { EntitiesEnum, EntitiesState } from './entities.models';
import { getEntitesReducer } from './entities.reducer';

describe('entities.reducer.ts', () => {
  let reducer: ActionReducer<EntitiesState, Action>;
  let initialEntitiesState: EntitiesState;
  let expectedState: EntitiesState;

  beforeEach(() => {
    reducer = getEntitesReducer();
    initialEntitiesState = mockEntitiesInitialState();
    expectedState = _.cloneDeep(initialEntitiesState);
  });

  it('should correctly ADD ONE entity', () => {
    initialEntitiesState[EntitiesEnum.FOOD] = {
      entities: { [mockData.FOODS.FOOD_1.id]: mockData.FOODS.FOOD_1 },
      ids: [mockData.FOODS.FOOD_1.id],
    };
    const action = addOneAction()({
      key: EntitiesEnum.FOOD,
      entity: mockData.FOODS.FOOD_2,
    });
    const state = reducer(initialEntitiesState, action);

    expectedState[EntitiesEnum.FOOD] = {
      entities: {
        [mockData.FOODS.FOOD_1.id]: mockData.FOODS.FOOD_1,
        [mockData.FOODS.FOOD_2.id]: mockData.FOODS.FOOD_2,
      },
      ids: [mockData.FOODS.FOOD_1.id, mockData.FOODS.FOOD_2.id],
    };
    expect(state).toEqual(expectedState);
  });

  it('should correctly ADD MANY entity', () => {
    initialEntitiesState[EntitiesEnum.FOOD] = {
      entities: { [mockData.FOODS.FOOD_1.id]: mockData.FOODS.FOOD_1 },
      ids: [mockData.FOODS.FOOD_1.id],
    };
    const action = addManyAction()({
      key: EntitiesEnum.FOOD,
      entities: [mockData.FOODS.FOOD_2, mockData.FOODS.FOOD_3],
    });
    const state = reducer(initialEntitiesState, action);

    expectedState[EntitiesEnum.FOOD] = {
      entities: {
        [mockData.FOODS.FOOD_1.id]: mockData.FOODS.FOOD_1,
        [mockData.FOODS.FOOD_2.id]: mockData.FOODS.FOOD_2,
        [mockData.FOODS.FOOD_3.id]: mockData.FOODS.FOOD_3,
      },
      ids: [mockData.FOODS.FOOD_1.id, mockData.FOODS.FOOD_2.id, mockData.FOODS.FOOD_3.id],
    };
    expect(state).toEqual(expectedState);
  });

  it('should correctly ADD ALL entity', () => {
    initialEntitiesState[EntitiesEnum.FOOD] = {
      entities: { [mockData.FOODS.FOOD_1.id]: mockData.FOODS.FOOD_1 },
      ids: [mockData.FOODS.FOOD_1.id],
    };
    const action = addAllAction()({
      key: EntitiesEnum.FOOD,
      entities: [mockData.FOODS.FOOD_2, mockData.FOODS.FOOD_3],
    });
    const state = reducer(initialEntitiesState, action);

    expectedState[EntitiesEnum.FOOD] = {
      entities: {
        [mockData.FOODS.FOOD_2.id]: mockData.FOODS.FOOD_2,
        [mockData.FOODS.FOOD_3.id]: mockData.FOODS.FOOD_3,
      },
      ids: [mockData.FOODS.FOOD_2.id, mockData.FOODS.FOOD_3.id],
    };
    expect(state).toEqual(expectedState);
  });

  it('should correctly REMOVE ONE entity', () => {
    initialEntitiesState[EntitiesEnum.FOOD] = {
      entities: {
        [mockData.FOODS.FOOD_1.id]: mockData.FOODS.FOOD_1,
        [mockData.FOODS.FOOD_2.id]: mockData.FOODS.FOOD_2,
        [mockData.FOODS.FOOD_3.id]: mockData.FOODS.FOOD_3,
      },
      ids: [mockData.FOODS.FOOD_1.id, mockData.FOODS.FOOD_2.id, mockData.FOODS.FOOD_3.id],
    };
    const action = removeOneAction()({
      key: EntitiesEnum.FOOD,
      id: mockData.FOODS.FOOD_2.id,
    });
    const state = reducer(initialEntitiesState, action);

    expectedState[EntitiesEnum.FOOD] = {
      entities: {
        [mockData.FOODS.FOOD_1.id]: mockData.FOODS.FOOD_1,
        [mockData.FOODS.FOOD_3.id]: mockData.FOODS.FOOD_3,
      },
      ids: [mockData.FOODS.FOOD_1.id, mockData.FOODS.FOOD_3.id],
    };
    expect(state).toEqual(expectedState);
  });

  it('should correctly REMOVE MANY entity', () => {
    initialEntitiesState[EntitiesEnum.FOOD] = {
      entities: {
        [mockData.FOODS.FOOD_1.id]: mockData.FOODS.FOOD_1,
        [mockData.FOODS.FOOD_2.id]: mockData.FOODS.FOOD_2,
        [mockData.FOODS.FOOD_3.id]: mockData.FOODS.FOOD_3,
      },
      ids: [mockData.FOODS.FOOD_1.id, mockData.FOODS.FOOD_2.id, mockData.FOODS.FOOD_3.id],
    };
    const action = removeManyAction()({
      key: EntitiesEnum.FOOD,
      ids: [mockData.FOODS.FOOD_1.id, mockData.FOODS.FOOD_3.id],
    });
    const state = reducer(initialEntitiesState, action);

    expectedState[EntitiesEnum.FOOD] = {
      entities: {
        [mockData.FOODS.FOOD_2.id]: mockData.FOODS.FOOD_2,
      },
      ids: [mockData.FOODS.FOOD_2.id],
    };
    expect(state).toEqual(expectedState);
  });

  it('should correctly REMOVE All entity', () => {
    initialEntitiesState[EntitiesEnum.FOOD] = {
      entities: {
        [mockData.FOODS.FOOD_1.id]: mockData.FOODS.FOOD_1,
        [mockData.FOODS.FOOD_2.id]: mockData.FOODS.FOOD_2,
      },
      ids: [mockData.FOODS.FOOD_1.id, mockData.FOODS.FOOD_2.id],
    };
    const action = removeAllAction()({
      key: EntitiesEnum.FOOD,
    });
    const state = reducer(initialEntitiesState, action);

    expectedState[EntitiesEnum.FOOD] = {
      entities: {},
      ids: [],
    };
    expect(state).toEqual(expectedState);
  });

  it('should correctly UPDATE ONE entity', () => {
    initialEntitiesState[EntitiesEnum.FOOD] = {
      entities: {
        [mockData.FOODS.FOOD_1.id]: mockData.FOODS.FOOD_1,
        [mockData.FOODS.FOOD_2.id]: mockData.FOODS.FOOD_2,
      },
      ids: [mockData.FOODS.FOOD_1.id, mockData.FOODS.FOOD_2.id],
    };
    const newFood = _.cloneDeep(mockData.FOODS.FOOD_1);
    newFood.name = 'newName';
    const action = updateOneAction()({
      key: EntitiesEnum.FOOD,
      entity: { id: mockData.FOODS.FOOD_1.id, changes: newFood },
    });
    const state = reducer(initialEntitiesState, action);

    expectedState[EntitiesEnum.FOOD] = {
      entities: {
        [mockData.FOODS.FOOD_1.id]: newFood,
        [mockData.FOODS.FOOD_2.id]: mockData.FOODS.FOOD_2,
      },
      ids: [mockData.FOODS.FOOD_1.id, mockData.FOODS.FOOD_2.id],
    };
    expect(state).toEqual(expectedState);
  });

  it('should correctly UPDATE MANY entity', () => {
    initialEntitiesState[EntitiesEnum.FOOD] = {
      entities: {
        [mockData.FOODS.FOOD_1.id]: mockData.FOODS.FOOD_1,
        [mockData.FOODS.FOOD_2.id]: mockData.FOODS.FOOD_2,
      },
      ids: [mockData.FOODS.FOOD_1.id, mockData.FOODS.FOOD_2.id],
    };

    const newFood1 = _.cloneDeep(mockData.FOODS.FOOD_1);
    newFood1.name = 'newName1';
    const newFood2 = _.cloneDeep(mockData.FOODS.FOOD_2);
    newFood2.name = 'newName2';

    const action = updateManyAction()({
      key: EntitiesEnum.FOOD,
      entities: [
        { id: mockData.FOODS.FOOD_1.id, changes: newFood1 },
        { id: mockData.FOODS.FOOD_2.id, changes: newFood2 },
      ],
    });
    const state = reducer(initialEntitiesState, action);

    expectedState[EntitiesEnum.FOOD] = {
      entities: {
        [mockData.FOODS.FOOD_1.id]: newFood1,
        [mockData.FOODS.FOOD_2.id]: newFood2,
      },
      ids: [mockData.FOODS.FOOD_1.id, mockData.FOODS.FOOD_2.id],
    };
    expect(state).toEqual(expectedState);
  });

  it('should correctly UPSERT ONE new entity', () => {
    initialEntitiesState[EntitiesEnum.FOOD] = {
      entities: { [mockData.FOODS.FOOD_1.id]: mockData.FOODS.FOOD_1 },
      ids: [mockData.FOODS.FOOD_1.id],
    };
    const action = upsertOneAction()({
      key: EntitiesEnum.FOOD,
      entity: mockData.FOODS.FOOD_2,
    });
    const state = reducer(initialEntitiesState, action);

    expectedState[EntitiesEnum.FOOD] = {
      entities: {
        [mockData.FOODS.FOOD_1.id]: mockData.FOODS.FOOD_1,
        [mockData.FOODS.FOOD_2.id]: mockData.FOODS.FOOD_2,
      },
      ids: [mockData.FOODS.FOOD_1.id, mockData.FOODS.FOOD_2.id],
    };
    expect(state).toEqual(expectedState);
  });

  it('should correctly UPSERT ONE existing entity', () => {
    initialEntitiesState[EntitiesEnum.FOOD] = {
      entities: {
        [mockData.FOODS.FOOD_1.id]: mockData.FOODS.FOOD_1,
        [mockData.FOODS.FOOD_2.id]: mockData.FOODS.FOOD_2,
      },
      ids: [mockData.FOODS.FOOD_1.id, mockData.FOODS.FOOD_2.id],
    };
    const newFood = _.cloneDeep(mockData.FOODS.FOOD_2);
    newFood.name = 'newName';
    const action = upsertOneAction()({
      key: EntitiesEnum.FOOD,
      entity: newFood,
    });
    const state = reducer(initialEntitiesState, action);

    expectedState[EntitiesEnum.FOOD] = {
      entities: {
        [mockData.FOODS.FOOD_1.id]: mockData.FOODS.FOOD_1,
        [mockData.FOODS.FOOD_2.id]: newFood,
      },
      ids: [mockData.FOODS.FOOD_1.id, mockData.FOODS.FOOD_2.id],
    };
    expect(state).toEqual(expectedState);
  });

  it('should correctly UPSERT MANY entity', () => {
    initialEntitiesState[EntitiesEnum.FOOD] = {
      entities: {
        [mockData.FOODS.FOOD_1.id]: mockData.FOODS.FOOD_1,
        [mockData.FOODS.FOOD_2.id]: mockData.FOODS.FOOD_2,
      },
      ids: [mockData.FOODS.FOOD_1.id, mockData.FOODS.FOOD_2.id],
    };
    const newFood = _.cloneDeep(mockData.FOODS.FOOD_1);
    newFood.name = 'newName';

    const action = upsertManyAction()({
      key: EntitiesEnum.FOOD,
      entities: [newFood, mockData.FOODS.FOOD_3],
    });
    const state = reducer(initialEntitiesState, action);

    expectedState[EntitiesEnum.FOOD] = {
      entities: {
        [mockData.FOODS.FOOD_1.id]: newFood,
        [mockData.FOODS.FOOD_2.id]: mockData.FOODS.FOOD_2,
        [mockData.FOODS.FOOD_3.id]: mockData.FOODS.FOOD_3,
      },
      ids: [mockData.FOODS.FOOD_1.id, mockData.FOODS.FOOD_2.id, mockData.FOODS.FOOD_3.id],
    };
    expect(state).toEqual(expectedState);
  });
});

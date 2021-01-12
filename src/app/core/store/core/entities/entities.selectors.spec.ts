import * as _ from 'lodash';
import { mockData, mockEntitiesInitialState } from 'tests/unit-tests.mock';
import { EntitiesEnum, EntitiesState } from './entities.models';
import {
  getAllEntitiesByDataConditionIds,
  getEntitiesSelectAll,
  getEntitiesSelectEntities,
  getEntitiesSelectIds,
  getEntitiesSelectTotal,
  getSelectors,
} from './entities.selectors';

describe('entities.selectors.ts', () => {
  let initialEntitiesState: EntitiesState;

  beforeEach(() => {
    initialEntitiesState = mockEntitiesInitialState();
  });

  it('should return Select Ids', () => {
    initialEntitiesState[EntitiesEnum.FOOD].entities = {
      [mockData.FOODS.FOOD_1.id]: mockData.FOODS.FOOD_1,
      [mockData.FOODS.FOOD_3.id]: mockData.FOODS.FOOD_3,
    };

    initialEntitiesState[EntitiesEnum.FOOD].ids = [mockData.FOODS.FOOD_1.id, mockData.FOODS.FOOD_3.id];
    const result = getEntitiesSelectIds(EntitiesEnum.FOOD).projector(
      initialEntitiesState[EntitiesEnum.FOOD],
      getSelectors(EntitiesEnum.FOOD).selectIds
    );

    const expectedResult = [mockData.FOODS.FOOD_1.id, mockData.FOODS.FOOD_3.id];
    expect(result).toEqual(expectedResult);
  });

  it('should return Entities', () => {
    initialEntitiesState[EntitiesEnum.FOOD].entities = {
      [mockData.FOODS.FOOD_1.id]: mockData.FOODS.FOOD_1,
      [mockData.FOODS.FOOD_3.id]: mockData.FOODS.FOOD_3,
    };

    initialEntitiesState[EntitiesEnum.FOOD].ids = [mockData.FOODS.FOOD_1.id, mockData.FOODS.FOOD_3.id];
    const result = getEntitiesSelectEntities(EntitiesEnum.FOOD).projector(
      initialEntitiesState[EntitiesEnum.FOOD],
      getSelectors(EntitiesEnum.FOOD).selectEntities
    );

    const expectedResult = {
      [mockData.FOODS.FOOD_1.id]: mockData.FOODS.FOOD_1,
      [mockData.FOODS.FOOD_3.id]: mockData.FOODS.FOOD_3,
    };
    expect(result).toEqual(expectedResult);
  });

  it('should return All', () => {
    initialEntitiesState[EntitiesEnum.FOOD].entities = {
      [mockData.FOODS.FOOD_1.id]: mockData.FOODS.FOOD_1,
      [mockData.FOODS.FOOD_3.id]: mockData.FOODS.FOOD_3,
    };

    initialEntitiesState[EntitiesEnum.FOOD].ids = [mockData.FOODS.FOOD_1.id, mockData.FOODS.FOOD_3.id];
    const result = getEntitiesSelectAll(EntitiesEnum.FOOD).projector(
      initialEntitiesState[EntitiesEnum.FOOD],
      getSelectors(EntitiesEnum.FOOD).selectAll
    );

    const expectedResult = [mockData.FOODS.FOOD_1, mockData.FOODS.FOOD_3];
    expect(result).toEqual(expectedResult);
  });

  it('should return Total', () => {
    initialEntitiesState[EntitiesEnum.FOOD].entities = {
      [mockData.FOODS.FOOD_1.id]: mockData.FOODS.FOOD_1,
      [mockData.FOODS.FOOD_2.id]: mockData.FOODS.FOOD_2,
    };

    initialEntitiesState[EntitiesEnum.FOOD].ids = [mockData.FOODS.FOOD_1.id, mockData.FOODS.FOOD_2.id];
    const result = getEntitiesSelectTotal(EntitiesEnum.FOOD).projector(
      initialEntitiesState[EntitiesEnum.FOOD],
      getSelectors(EntitiesEnum.FOOD).selectAll
    );

    const expectedResult = 2;
    expect(result).toEqual(expectedResult);
  });

  it('should return All by DataConditionIds', () => {
    initialEntitiesState[EntitiesEnum.FOOD].entities = {
      [mockData.FOODS.FOOD_1.id]: mockData.FOODS.FOOD_1,
      [mockData.FOODS.FOOD_2.id]: mockData.FOODS.FOOD_2,
      [mockData.FOODS.FOOD_3.id]: mockData.FOODS.FOOD_3,
    };
    initialEntitiesState[EntitiesEnum.FOOD].ids = [
      mockData.FOODS.FOOD_1.id,
      mockData.FOODS.FOOD_2.id,
      mockData.FOODS.FOOD_3.id,
    ];
    const result = getAllEntitiesByDataConditionIds(EntitiesEnum.FOOD, 0).projector(
      initialEntitiesState[EntitiesEnum.FOOD].entities,
      { entityIds: [1, 3] }
    );

    const expectedResult = [mockData.FOODS.FOOD_1, mockData.FOODS.FOOD_3];
    expect(result).toEqual(expectedResult);
  });
});

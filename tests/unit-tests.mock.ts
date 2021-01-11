import { Food } from '@core/models/food.models';
import { DataConditionState } from '@core/store/core/data-condition/data-condition.reducer';
import { EntitiesEnum, EntitiesState } from '@core/store/core/entities/entities.models';
import { adapters } from '@core/store/core/entities/entities.reducer';
import * as _ from 'lodash';

export const mockEntitiesInitialState = (): EntitiesState => {
  const state = {} as EntitiesState;
  _.forEach(EntitiesEnum, (type) => {
    const adapter = adapters[type].getInitialState();
    state[type] = adapter;
  });
  return state;
};

export const mockDataConditionInitialState = (): DataConditionState => {
  const state = {} as DataConditionState;
  _.forEach(EntitiesEnum, (key) => (state[key] = {}));
  return state;
};

export const mockData = {
  FOODS: {
    FOOD_1: {
      id: 1,
      name: 'testName1',
      description: 'testDesc1',
      rate: 4,
      isFavorite: false,
      isPrivate: true,
      isPlanned: false,
      photoPath: 'testPath1',
      createDate: 'testDate1',

      user: {
        id: 1,
        username: 'testUser1',
        photoPath: 'testUserPath1',
      },
      restaurant: {
        id: 'testId1',
        formattedAddress: 'testAdress1',
        name: 'testName1',
        rating: 1,
        types: [],
        url: 'testUrl1',
        website: 'testWebsite1',
      },
      foodTypeId: 1,
    } as Food,
    FOOD_2: {
      id: 2,
      name: 'testName2',
      description: 'testDesc2',
      rate: 2,
      isFavorite: true,
      isPrivate: false,
      isPlanned: true,
      photoPath: 'testPath2',
      createDate: 'testDate2',

      user: {
        id: 2,
        username: 'testUser2',
        photoPath: 'testUserPath2',
      },
      restaurant: {
        id: 'testId2',
        formattedAddress: 'testAdress2',
        name: 'testName2',
        rating: 2,
        types: [],
        url: 'testUrl2',
        website: 'testWebsite2',
      },
      foodTypeId: 2,
    } as Food,
    FOOD_3: {
      id: 3,
      name: 'testName3',
      description: 'testDesc3',
      rate: 3,
      isFavorite: false,
      isPrivate: false,
      isPlanned: true,
      photoPath: 'testPath3',
      createDate: 'testDate3',

      user: {
        id: 3,
        username: 'testUser3',
        photoPath: 'testUserPath3',
      },
      restaurant: {
        id: 'testId3',
        formattedAddress: 'testAdress3',
        name: 'testName3',
        rating: 3,
        types: [],
        url: 'testUrl3',
        website: 'testWebsite3',
      },
      foodTypeId: 3,
    } as Food,
  },
};

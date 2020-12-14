import { HttpPaginatorMeta } from '@core/models/custom-http.models';
import { createReducer, on } from '@ngrx/store';
import * as _ from 'lodash';
import { foodListSetPaginatorAction } from './food-list.actions';

export interface FoodListState {
  paginator: HttpPaginatorMeta;
}

const foodListInitialState: FoodListState = {
  paginator: { currentPage: 1 } as HttpPaginatorMeta,
};

export const foodListReducer = createReducer(
  foodListInitialState,
  on(foodListSetPaginatorAction, (state, { payload }) =>
    _.assign({}, state, { paginator: payload.paginator } as FoodListState)
  )
);

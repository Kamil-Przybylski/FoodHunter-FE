import { HttpPaginatorMeta } from '@core/models/custom-http.models';
import { createReducer, on } from '@ngrx/store';
import * as _ from 'lodash';
import { HttpUtil } from '@core/utils/http.util';
import { accountFoodSetPaginatorAction } from './account-food.actions';

export interface AccountFoodState {
  paginator: HttpPaginatorMeta;
}

const accountFoodInitialState: AccountFoodState = {
  paginator: { currentPage: 1 } as HttpPaginatorMeta,
};

export const accountFoodReducer = createReducer(
  accountFoodInitialState,
  on(accountFoodSetPaginatorAction, (state, { payload }) => {
    const paginator = { paginator: HttpUtil.setPaginator(payload.paginator) } as AccountFoodState;
    return _.assign({}, state, paginator);
  })
);

import { HttpPaginatorMeta } from '@core/models/custom-http.models';
import { createReducer, on } from '@ngrx/store';
import * as _ from 'lodash';
import { discoverListSetPaginatorAction } from '@core/store/discover/discover-list/discover-list.actions';

export interface DiscoverListState {
  paginator: HttpPaginatorMeta;
}

const discoverListInitialState: DiscoverListState = {
  paginator: { currentPage: 1 } as HttpPaginatorMeta,
};

export const discoverListReducer = createReducer(
  discoverListInitialState,
  on(discoverListSetPaginatorAction, (state, { payload }) => _.assign({}, state, { paginator: payload }))
);

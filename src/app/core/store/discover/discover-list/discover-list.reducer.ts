import { HttpPaginatorMeta } from '@core/models/custom-http.models';
import { createReducer, on } from '@ngrx/store';
import * as _ from 'lodash';
import { discoverListSetPaginatorAction } from '@core/store/discover/discover-list/discover-list.actions';
import { HttpUtil } from '@core/utils/http.util';

export interface DiscoverListState {
  paginator: HttpPaginatorMeta;
}

const discoverListInitialState: DiscoverListState = {
  paginator: { currentPage: 1 } as HttpPaginatorMeta,
};

export const discoverListReducer = createReducer(
  discoverListInitialState,
  on(discoverListSetPaginatorAction, (state, { payload }) => {
    const paginator = { paginator: HttpUtil.setPaginator(payload.paginator) } as DiscoverListState;
    return _.assign({}, state, paginator);
  })
);

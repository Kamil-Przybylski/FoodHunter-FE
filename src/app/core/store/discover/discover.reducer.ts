import { HttpPaginatorMeta } from '@core/models/custom-http.models';
import { createFeatureSelector, createReducer, on } from '@ngrx/store';
import * as _ from 'lodash';
import { discoverSetPaginatorAction } from './discover.actions';

export interface DiscoverState {
  paginator: HttpPaginatorMeta;
}

const discoverInitialState: DiscoverState = {
  paginator: { currentPage: 1 } as HttpPaginatorMeta,
};

export const discoverReducer = createReducer(
  discoverInitialState,
  on(discoverSetPaginatorAction, (state, { payload }) => _.assign({}, state, { paginator: payload }))
);

export const getDiscoverModuleState = createFeatureSelector<DiscoverState>('discover');

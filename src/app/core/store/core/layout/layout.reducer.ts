import { createReducer, on } from '@ngrx/store';
import { layoutRouterLoginAction, layoutRouterSetPreviousPageAction } from './layout.actions';
import * as _ from 'lodash';

export interface LayoutState {
  routerLoginUrl: string | null;
  routerPreviousPage: string | null;
  routerCurrentPage: string | null;
}

const initialState: LayoutState = {
  routerLoginUrl: null,
  routerPreviousPage: null,
  routerCurrentPage: null,
};

export const layoutReducer = createReducer(
  initialState,
  on(layoutRouterLoginAction, (state, { payload }) =>
    _.assign({}, state, { routerLoginUrl: payload.url } as LayoutState)
  ),
  on(layoutRouterSetPreviousPageAction, (state, { payload }) =>
    _.assign({}, state, { routerPreviousPage: state.routerCurrentPage, routerCurrentPage: payload.url } as LayoutState)
  )
);

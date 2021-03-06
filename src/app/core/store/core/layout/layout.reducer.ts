import { createReducer, on } from '@ngrx/store';
import { layoutRouterLoginAction } from './layout.actions';
import * as _ from 'lodash';

export interface LayoutState {
  routerLoginUrl: string;
}

const initialState: LayoutState = {
  routerLoginUrl: null,
};

export const layoutReducer = createReducer(
  initialState,
  on(layoutRouterLoginAction, (state, { payload }) =>
    _.assign({}, state, { routerLoginUrl: payload } as LayoutState)
  )
);

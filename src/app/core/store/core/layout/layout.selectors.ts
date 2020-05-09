import { createSelector } from '@ngrx/store';
import { getCoreModuleState } from '../core.reducer';

export const getLayoutState = createSelector(
  getCoreModuleState,
  coreState => coreState.layout
);

export const getLayoutLoginUrl = createSelector(
  getLayoutState,
  layoutState => layoutState.routerLoginUrl
);

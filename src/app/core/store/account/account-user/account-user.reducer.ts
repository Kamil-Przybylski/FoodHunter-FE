import { AuthFormUserModel } from '@core/models/auth.models';
import { createReducer, on } from '@ngrx/store';
import * as _ from 'lodash';
import {
  accountUserClearDraftAction,
  accountUserUpdateInfoDraftAction,
  accountUserUpdatePhotoDraftAction,
} from './account-user.actions';

export interface AccountUserState {
  infoDraft: AuthFormUserModel;
  avatarPhotoDraft: string;
}

const initialState: AccountUserState = {
  infoDraft: null,
  avatarPhotoDraft: null,
};

export const accountUserReducer = createReducer(
  initialState,
  on(accountUserUpdateInfoDraftAction, (state, { payload }) =>
    _.assign({}, state, { infoDraft: payload.formVal } as AccountUserState)
  ),
  on(accountUserUpdatePhotoDraftAction, (state, { payload }) =>
    _.assign({}, state, { avatarPhotoDraft: payload.photoPath } as AccountUserState)
  ),
  on(accountUserClearDraftAction, (state) => _.assign({}, state, { ...initialState } as AccountUserState))
);

import { Component, Input, OnInit } from '@angular/core';
import { AuthFormUserModel, AuthUser } from '@core/models/auth.models';
import { AppState } from '@core/store';
import { accountUserSaveInfoAction } from '@core/store/account/account-user/account-user.actions';
import { Store } from '@ngrx/store';
import { NotifierService } from '@shared/services/notifier.service';
import * as _ from 'lodash';
import { MessageEnum } from 'src/config';

@Component({
  selector: 'app-account-user-form-dialog',
  templateUrl: './account-user-form-dialog.component.html',
  styleUrls: ['./account-user-form-dialog.component.scss'],
})
export class AccountUserFormDialogComponent implements OnInit {
  @Input() user: AuthUser;

  constructor(private store: Store<AppState>, private notifierService: NotifierService) {}

  ngOnInit() {}

  submitUser(userModel: AuthFormUserModel) {
    if (userModel.about === this.user.about) this.notifierService.snackBarMessage(MessageEnum.NO_CHANGES);
    else this.store.dispatch(accountUserSaveInfoAction({ payload: { data: userModel } }));
  }
}

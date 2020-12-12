import { Component, Input, OnInit } from '@angular/core';
import { AuthFormUserModel } from '@core/models/auth.models';
import { User } from '@core/models/user.models';
import { AppState } from '@core/store';
import { accountUserSaveInfoAction } from '@core/store/account/account-user/account-user.actions';
import { Store } from '@ngrx/store';
import { NotifierService } from '@shared/services/notifier.service';
import { MessageEnum } from 'src/config';

@Component({
  selector: 'app-user-edit-form-dialog',
  templateUrl: './user-edit-form-dialog.component.html',
  styleUrls: ['./user-edit-form-dialog.component.scss'],
})
export class UserEditFormDialogComponent implements OnInit {
  @Input() user!: User;

  constructor(private store: Store<AppState>, private notifierService: NotifierService) { }

  ngOnInit() {}

  submitUser(userModel: AuthFormUserModel) {
    if (userModel.about === this.user.about) this.notifierService.snackBarMessage(MessageEnum.NO_CHANGES);
    else this.store.dispatch(accountUserSaveInfoAction({ payload: { data: userModel } }));
  }
}

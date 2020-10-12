import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AuthFormUserFields, AuthFormUserModel, AuthUser } from '@core/models/auth.models';
import { AppState } from '@core/store';
import {
  accountUserSaveAction,
  accountUserUpdatePhotoDraftAction,
} from '@core/store/account/account-user/account-user.actions';
import {
  getAccountUserAuthUser,
  getAccountUserPhotoDraft,
} from '@core/store/account/account-user/account-user.selectors';
import { FormBuilderTypeSafe, FormGroupTypeSafe } from '@core/utils/form-builder-type-safe';
import { ModalController } from '@ionic/angular';
import { select, Store } from '@ngrx/store';
import { from, Observable } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { AccountUserPhotoComponent } from '../account-user-photo/account-user-photo.component';

@Component({
  selector: 'app-account-user',
  templateUrl: './account-user.component.html',
  styleUrls: ['./account-user.component.scss'],
})
export class AccountUserComponent implements OnInit {
  user$: Observable<AuthUser>;
  photoDraft$: Observable<string>;

  constructor(private store: Store<AppState>, private modalCtrl: ModalController) {}

  ngOnInit() {
    this.user$ = this.store.pipe(select(getAccountUserAuthUser));
    this.photoDraft$ = this.store.pipe(select(getAccountUserPhotoDraft));
  }

  imagePick({ photoData }: { photoData: string }) {
    if (!photoData) return;
    this.store.dispatch(accountUserUpdatePhotoDraftAction({ payload: { photoPath: photoData } }));
  }

  takePhoto() {
    const modal$ = this.modalCtrl.create({
      component: AccountUserPhotoComponent,
      swipeToClose: true,
    });
    from(modal$)
      .pipe(
        take(1),
        tap((modal) => {
          modal.present();

          const dismiss$ = modal.onWillDismiss();
          from(dismiss$)
            .pipe(
              take(1),
              tap((diss) => this.imagePick(diss.data))
            )
            .subscribe();
        })
      )
      .subscribe();
  }

  submitUser(userModel: AuthFormUserModel) {
    this.store.dispatch(accountUserSaveAction({ payload: { data: userModel } }));
    // this.store.dispatch(accountUserClearDraftAction());
  }
}

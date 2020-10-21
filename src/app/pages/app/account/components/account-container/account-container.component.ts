import { Component, OnInit } from '@angular/core';
import { AuthUser } from '@core/models/auth.models';
import { AppState } from '@core/store';
import { accountUserUpdatePhotoDraftAction } from '@core/store/account/account-user/account-user.actions';
import {
  getAccountUserAuthUser,
  getAccountUserPhotoDraft,
} from '@core/store/account/account-user/account-user.selectors';
import { ModalController } from '@ionic/angular';
import { select, Store } from '@ngrx/store';
import { from, Observable } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { AccountUserFormDialogComponent } from '../account-user-form-dialog/account-user-form-dialog.component';
import { AccountUserPhotoComponent } from '../account-user-photo/account-user-photo.component';

@Component({
  selector: 'app-account-container',
  templateUrl: './account-container.component.html',
  styleUrls: ['./account-container.component.scss'],
})
export class AccountContainerComponent implements OnInit {
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
    this.user$
      .pipe(
        take(1),
        tap((user) => this.openPhotoDialog(user))
      )
      .subscribe();
  }

  private openPhotoDialog(user: AuthUser) {
    const modal$ = this.modalCtrl.create({
      component: AccountUserPhotoComponent,
      componentProps: { user },
      swipeToClose: true,
    });

    from(modal$)
      .pipe(
        take(1),
        tap((modal) => modal.present())
      )
      .subscribe();
  }

  editProfile(user: AuthUser) {
    const modal$ = this.modalCtrl.create({
      component: AccountUserFormDialogComponent,
      componentProps: { user },
      swipeToClose: true,
    });
    from(modal$)
      .pipe(
        take(1),
        tap((modal) => modal.present())
      )
      .subscribe();
  }
}

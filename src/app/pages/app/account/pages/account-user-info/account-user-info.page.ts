import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthUser } from '@core/models/auth.models';
import { User, UserShort } from '@core/models/user.models';
import { AppState } from '@core/store';
import { accountUserDownloadUserAction } from '@core/store/account/account-followers/account-followers.actions';
import {
  getFollowersIsEditMode,
  getFollowersUser,
  getFollowersUserShort,
} from '@core/store/account/account-followers/account-followers.selectors';
import { getAccountUserAuthUser } from '@core/store/account/account-user/account-user.selectors';
import { getLayoutPreviousUrl } from '@core/store/core/layout/layout.selectors';
import { CommonUtil } from '@core/utils/common.util';
import { ModalController } from '@ionic/angular';
import { select, Store } from '@ngrx/store';
import { from } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { filter, take, tap, withLatestFrom } from 'rxjs/operators';
import { AppRoutesEnum } from 'src/app/app.routes';
import { UserEditFormDialogComponent } from './components/user-edit-form-dialog/user-edit-form-dialog.component';
import { UserPhotoFormDialogComponent } from './components/user-photo-form-dialog/user-photo-form-dialog.component';

@Component({
  selector: 'app-account-user-info',
  templateUrl: './account-user-info.page.html',
  styleUrls: ['./account-user-info.page.scss'],
})
export class AccountUserInfoPage implements OnInit {
  public AppRoutesEnum = AppRoutesEnum;

  private userId!: number;
  public isBackButtonActive = false;

  public authUser$!: Observable<AuthUser>;
  public user$!: Observable<User>;
  public userShort$!: Observable<UserShort>;
  public isEditMode$!: Observable<boolean>;
  public previousPage$!: Observable<string | null>;

  constructor(
    private store: Store<AppState>,
    private router: Router,
    private route: ActivatedRoute,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {
    this.userId = CommonUtil.getUrlProp(this.route, AppRoutesEnum.USER_ID);

    this.authUser$ = this.store.pipe(select(getAccountUserAuthUser));
    this.user$ = this.store.pipe(select(getFollowersUser(this.userId)));
    this.userShort$ = this.store.pipe(select(getFollowersUserShort(this.userId)));
    this.isEditMode$ = this.store.pipe(select(getFollowersIsEditMode(this.userId)));
    this.previousPage$ = this.store.pipe(select(getLayoutPreviousUrl));

    this.downloadData();
  }

  private downloadData() {
    this.isEditMode$
      .pipe(
        take(1),
        filter((isEditMode) => !isEditMode),
        tap((isEditMode) => this.store.dispatch(accountUserDownloadUserAction({ payload: { userId: this.userId } })))
      )
      .subscribe();
  }

  private openEditDialog(user: User) {
    const modal$ = this.modalCtrl.create({
      component: UserEditFormDialogComponent,
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

  private openPhotoDialog(user: User) {
    const modal$ = this.modalCtrl.create({
      component: UserPhotoFormDialogComponent,
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

  editProfile() {
    this.authUser$
      .pipe(
        take(1),
        withLatestFrom(this.isEditMode$),
        filter(([authUser, isEditMode]) => isEditMode),
        tap(([authUser, isEditMode]) => this.openEditDialog(authUser))
      )
      .subscribe();
  }

  takePhoto() {
    this.authUser$
      .pipe(
        take(1),
        withLatestFrom(this.isEditMode$),
        filter(([authUser, isEditMode]) => isEditMode),
        tap(([authUser, isEditMode]) => this.openPhotoDialog(authUser))
      )
      .subscribe();
  }

  navigateBack() {
    this.previousPage$
      .pipe(
        take(1),
        tap((url) => {
          if (url) this.router.navigateByUrl(url);
          else
            this.router.navigate([
              '/',
              AppRoutesEnum.APP,
              AppRoutesEnum.TABS,
              AppRoutesEnum.ACCOUNT,
              AppRoutesEnum.START,
            ]);
        })
      )
      .subscribe();
  }
}

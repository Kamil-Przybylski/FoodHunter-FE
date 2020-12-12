import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthUser } from '@core/models/auth.models';
import { UserShort } from '@core/models/user.models';
import { AppState } from '@core/store';
import {
  accountFollowersShortDownloadAllAction,
  accountUserFollowersAddFollowerAction,
} from '@core/store/account/account-followers/account-followers.actions';
import { getFollowersAllList } from '@core/store/account/account-followers/account-followers.selectors';
import { getAccountUserAuthUser } from '@core/store/account/account-user/account-user.selectors';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { AppRoutesEnum } from 'src/app/app.routes';

@Component({
  selector: 'app-account-user-list',
  templateUrl: './account-user-list.page.html',
  styleUrls: ['./account-user-list.page.scss'],
})
export class AccountUserListPage implements OnInit {
  AppRoutesEnum = AppRoutesEnum;

  userList$!: Observable<UserShort[]>;
  authUser$!: Observable<AuthUser>;

  constructor(private store: Store<AppState>, public router: Router) {}

  ngOnInit() {
    this.userList$ = this.store.pipe(select(getFollowersAllList));
    this.authUser$ = this.store.pipe(select(getAccountUserAuthUser));

    this.store.dispatch(accountFollowersShortDownloadAllAction());
  }

  addUser(userShort: UserShort) {
    this.authUser$
      .pipe(
        take(1),
        tap((authUser) =>
          this.store.dispatch(
            accountUserFollowersAddFollowerAction({ payload: { authUserId: authUser.id, userId: userShort.id } })
          )
        )
      )
      .subscribe();
  }

  openProfile(userId: number) {
    this.router.navigate([
      '/',
      AppRoutesEnum.APP,
      AppRoutesEnum.TABS,
      AppRoutesEnum.ACCOUNT,
      AppRoutesEnum.INFO,
      userId,
    ]);
  }
}

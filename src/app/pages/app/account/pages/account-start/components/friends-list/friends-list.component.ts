import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserShort } from '@core/models/user.models';
import { AppState } from '@core/store';
import {
  accountUserFollowersShortDownloadAction,
  accountUserFollowersRemoveFollowerAction,
} from '@core/store/account/account-followers/account-followers.actions';
import { getFollowersUserList } from '@core/store/account/account-followers/account-followers.selectors';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppRoutesEnum } from 'src/app/app.routes';

@Component({
  selector: 'app-friends-list',
  templateUrl: './friends-list.component.html',
  styleUrls: ['./friends-list.component.scss'],
})
export class FriendsListComponent implements OnInit {
  @Input() userId!: number;

  AppRoutesEnum = AppRoutesEnum;

  followerList$!: Observable<UserShort[]>;

  constructor(private store: Store<AppState>, public router: Router) {}

  ngOnInit() {
    this.followerList$ = this.store.pipe(select(getFollowersUserList));
    this.store.dispatch(accountUserFollowersShortDownloadAction({ payload: { userId: this.userId } }));
  }

  openUserDetails(userId: number) {
    this.router.navigate([
      '/',
      AppRoutesEnum.APP,
      AppRoutesEnum.TABS,
      AppRoutesEnum.ACCOUNT,
      AppRoutesEnum.INFO,
      userId,
    ]);
  }

  removeUser(userShort: UserShort) {
    this.store.dispatch(
      accountUserFollowersRemoveFollowerAction({ payload: { authUserId: this.userId, userId: userShort.id } })
    );
  }
}

import { Component, Input, OnInit } from '@angular/core';
import { UserShort } from '@core/models/user.models';
import { AppState } from '@core/store';
import {
  accountFollowersShortDownloadAllAction,
  accountUserFollowersAddFollowerAction,
} from '@core/store/account/account-followers/account-followers.actions';
import { getFollowersAllList } from '@core/store/account/account-followers/account-followers.selectors';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-account-follower-find-dialog',
  templateUrl: './account-follower-find-dialog.component.html',
  styles: [],
})
export class AccountFollowerFindDialogComponent implements OnInit {
  @Input() userId!: number;

  followerList$!: Observable<UserShort[]>;

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.followerList$ = this.store.pipe(select(getFollowersAllList));
    this.store.dispatch(accountFollowersShortDownloadAllAction());
  }

  addUser(userShort: UserShort) {
    this.store.dispatch(accountUserFollowersAddFollowerAction({ payload: { authUserId: null, userId: userShort.id } }));
  }
}

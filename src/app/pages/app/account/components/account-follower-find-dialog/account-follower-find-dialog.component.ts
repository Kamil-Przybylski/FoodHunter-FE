import { Component, Input, OnInit } from '@angular/core';
import { UserShort } from '@core/models/user.models';
import { AppState } from '@core/store';
import {
  accountFollowersDownloadAllAction,
  accountUserFollowersAddFollowerAction,
} from '@core/store/account/account-followers/account-followers.actions';
import { getAccountAllFollowersList } from '@core/store/account/account-followers/account-followers.actions.selectors';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-account-follower-find-dialog',
  templateUrl: './account-follower-find-dialog.component.html',
  styleUrls: ['./account-follower-find-dialog.component.scss'],
})
export class AccountFollowerFindDialogComponent implements OnInit {
  @Input() userId: number;

  followerList$: Observable<UserShort[]>;

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.followerList$ = this.store.pipe(select(getAccountAllFollowersList));

    this.store.dispatch(accountFollowersDownloadAllAction());
  }

  addUser(userShort: UserShort) {
    this.store.dispatch(accountUserFollowersAddFollowerAction({ payload: { userId: userShort.id } }));
  }
}

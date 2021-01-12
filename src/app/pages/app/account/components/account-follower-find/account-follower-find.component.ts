import { Component, Input, OnInit } from '@angular/core';
import { UserShort } from '@core/models/user.models';
import { AppState } from '@core/store';
import { getFollowersUserList } from '@core/store/account/account-followers/account-followers.selectors';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-account-follower-find',
  templateUrl: './account-follower-find.component.html',
  styles: [],
})
export class AccountFollowerFindComponent implements OnInit {
  @Input() userId!: number;

  followerList$!: Observable<UserShort[]>;

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.followerList$ = this.store.pipe(select(getFollowersUserList(this.userId)));
  }
}

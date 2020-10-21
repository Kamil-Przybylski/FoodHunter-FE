import { Component, Input, OnInit } from '@angular/core';
import { UserShort } from '@core/models/user.models';
import { AppState } from '@core/store';
import { getAccountUserFollowersList } from '@core/store/account/account-followers/account-followers.actions.selectors';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-account-follower-find',
  templateUrl: './account-follower-find.component.html',
  styleUrls: ['./account-follower-find.component.scss'],
})
export class AccountFollowerFindComponent implements OnInit {
  @Input() userId: number;

  followerList$: Observable<UserShort[]>;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.followerList$ = this.store.pipe(select(getAccountUserFollowersList(this.userId)));

  }

}

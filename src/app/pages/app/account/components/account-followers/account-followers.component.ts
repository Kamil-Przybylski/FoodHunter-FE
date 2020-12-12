import { Component, Input, OnInit } from '@angular/core';
import { UserShort } from '@core/models/user.models';
import { AppState } from '@core/store';
import {
  accountUserFollowersShortDownloadAction,
  accountUserFollowersRemoveFollowerAction,
} from '@core/store/account/account-followers/account-followers.actions';
import { getFollowersUserList } from '@core/store/account/account-followers/account-followers.selectors';
import { ModalController } from '@ionic/angular';
import { select, Store } from '@ngrx/store';
import { from, Observable } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { AccountFollowerFindDialogComponent } from '../account-follower-find-dialog/account-follower-find-dialog.component';

@Component({
  selector: 'app-account-followers',
  templateUrl: './account-followers.component.html',
  styleUrls: ['./account-followers.component.scss'],
})
export class AccountFollowersComponent implements OnInit {
  @Input() userId!: number;

  followerList$!: Observable<UserShort[]>;

  constructor(private store: Store<AppState>, private modalCtrl: ModalController) {}

  ngOnInit() {
    this.followerList$ = this.store.pipe(select(getFollowersUserList(this.userId)));
    this.store.dispatch(accountUserFollowersShortDownloadAction({ payload: { userId: this.userId } }));
  }

  openFindDialog() {
    const modal$ = this.modalCtrl.create({
      component: AccountFollowerFindDialogComponent,
      componentProps: { userId: this.userId },
      swipeToClose: true,
    });
    from(modal$)
      .pipe(
        take(1),
        tap((modal) => modal.present())
      )
      .subscribe();
  }

  removeUser(userShort: UserShort) {
    this.store.dispatch(accountUserFollowersRemoveFollowerAction({ payload: { userId: userShort.id } }));
  }
}

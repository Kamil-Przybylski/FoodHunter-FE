import { Injectable } from '@angular/core';
import { UserService } from '@core/services/user.service';
import { downloadAction, saveAction } from '@core/store/core/data-condition/data-condition.actions';
import { EntitiesEnum } from '@core/store/core/entities/entities.models';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map } from 'rxjs/operators';
import {
  accountFollowersDownloadAllAction,
  accountUserFollowersAddFollowerAction,
  accountUserFollowersDownloadAction,
  accountUserFollowersRemoveFollowerAction,
} from './account-followers.actions';

@Injectable()
export class AccountFollowersEffects {
  downloadAllFolowers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(accountFollowersDownloadAllAction),
      // map((action) => action.payload),
      map(() =>
        downloadAction()({
          key: EntitiesEnum.USER_SHORT,
          dataId: 0,
          requestObservable: this.userService.downloadAllFollowers(),
        })
      )
    )
  );

  downloadUserFolowers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(accountUserFollowersDownloadAction),
      map((action) => action.payload),
      map(({ userId }) =>
        downloadAction()({
          key: EntitiesEnum.USER_SHORT,
          dataId: userId,
          requestObservable: this.userService.downloadUserFollowers(userId),
        })
      )
    )
  );

  addFolower$ = createEffect(() =>
    this.actions$.pipe(
      ofType(accountUserFollowersAddFollowerAction),
      map((action) => action.payload),
      map(({ userId }) =>
        saveAction()({
          key: EntitiesEnum.USER_SHORT,
          dataId: userId,
          requestObservable: this.userService.addUserFollower(userId),
        })
      )
    )
  );

  removeFolower$ = createEffect(() =>
    this.actions$.pipe(
      ofType(accountUserFollowersRemoveFollowerAction),
      map((action) => action.payload),
      map(({ userId }) =>
        saveAction()({
          key: EntitiesEnum.USER_SHORT,
          dataId: userId,
          requestObservable: this.userService.removeUserFollower(userId),
        })
      )
    )
  );

  constructor(private actions$: Actions, private userService: UserService) {}
}

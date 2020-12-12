import { Injectable } from '@angular/core';
import { UserService } from '@core/services/user.service';
import { deleteAction, downloadAction, saveAction } from '@core/store/core/data-condition/data-condition.actions';
import { EntitiesEnum } from '@core/store/core/entities/entities.models';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map } from 'rxjs/operators';
import {
  accountFollowersShortDownloadAllAction,
  accountUserDownloadUserAction,
  accountUserFollowersAddFollowerAction,
  accountUserFollowersShortDownloadAction,
  accountUserFollowersRemoveFollowerAction,
} from '@core/store/account/account-followers/account-followers.actions';

@Injectable()
export class AccountFollowersEffects {
  downloadAllFolowers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(accountFollowersShortDownloadAllAction),
      map(() =>
        downloadAction()({
          key: EntitiesEnum.USER_SHORT,
          dataId: 0,
          requestObservable: this.userService.downloadAllFollowersShort(),
        })
      )
    )
  );

  downloadUserFolowers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(accountUserFollowersShortDownloadAction),
      map((action) => action.payload),
      map(({ userId }) =>
        downloadAction()({
          key: EntitiesEnum.USER_SHORT,
          dataId: 1,
          requestObservable: this.userService.downloadUserFollowersShort(userId),
        })
      )
    )
  );

  downloadUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(accountUserDownloadUserAction),
      map((action) => action.payload),
      map(({ userId }) =>
        downloadAction()({
          key: EntitiesEnum.USER,
          dataId: 1,
          requestObservable: this.userService.downloadUser(userId),
        })
      )
    )
  );

  addFolower$ = createEffect(() =>
    this.actions$.pipe(
      ofType(accountUserFollowersAddFollowerAction),
      map((action) => action.payload),
      map(({ authUserId, userId }) =>
        saveAction()({
          key: EntitiesEnum.USER_SHORT,
          dataId: 0,
          requestObservable: this.userService.addUserFollower(authUserId, userId),
        })
      )
    )
  );

  removeFolower$ = createEffect(() =>
    this.actions$.pipe(
      ofType(accountUserFollowersRemoveFollowerAction),
      map((action) => action.payload),
      map(({ authUserId, userId }) =>
        deleteAction()({
          key: EntitiesEnum.USER_SHORT,
          dataId: 1,
          requestObservable: this.userService.removeUserFollower(authUserId, userId),
        })
      )
    )
  );

  constructor(private actions$: Actions, private userService: UserService) {}
}

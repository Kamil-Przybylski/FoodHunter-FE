import { Injectable } from '@angular/core';
import { HttpErrorResDto } from '@core/models/custom-http.models';
import { UserService } from '@core/services/user.service';
import { authUpdateUser } from '@core/store/core/auth/auth.actions';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { NotifierService } from '@shared/services/notifier.service';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { MessageEnum } from 'src/config';
import {
  accountUserSaveFailAction,
  accountUserSaveInfoAction,
  accountUserSavePhotoAction,
  accountUserSaveSuccessAction,
} from './account-user.actions';

@Injectable()
export class AccountUserEffects {
  updateUserInfo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(accountUserSaveInfoAction),
      map((action) => action.payload),
      switchMap(({ data }) =>
        this.userService.updateProfileInfo(data).pipe(
          map((res) => accountUserSaveSuccessAction({ payload: { data: res } })),
          catchError((err: HttpErrorResDto) =>
            of(
              accountUserSaveFailAction({
                payload: {
                  httpError: {
                    error: err.error,
                    message: err.message,
                    statusCode: err.statusCode,
                  },
                },
              })
            )
          )
        )
      )
    )
  );

  updateUserPhoto$ = createEffect(() =>
    this.actions$.pipe(
      ofType(accountUserSavePhotoAction),
      map((action) => action.payload),
      switchMap(({ photo, user }) =>
        this.userService.updateProfilePhoto(photo, user).pipe(
          map((res) => accountUserSaveSuccessAction({ payload: { data: res } })),
          catchError((err: HttpErrorResDto) =>
            of(
              accountUserSaveFailAction({
                payload: {
                  httpError: {
                    error: err.error,
                    message: err.message,
                    statusCode: err.statusCode,
                  },
                },
              })
            )
          )
        )
      )
    )
  );

  updateUserSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(accountUserSaveSuccessAction),
      map((action) => action.payload),
      map(({ data }) => authUpdateUser({ payload: { authUser: data } })),
      tap(() => this.notifierService.snackBarSuccess(MessageEnum.UPDATE_PRIFILE_SUCCESS))
    )
  );

  updateUserFail$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(accountUserSaveFailAction),
        map((action) => action.payload),
        tap(({ httpError }) => this.notifierService.snackBarError(httpError.message))
      ),
    { dispatch: false }
  );

  constructor(private actions$: Actions, private notifierService: NotifierService, private userService: UserService) {}
}

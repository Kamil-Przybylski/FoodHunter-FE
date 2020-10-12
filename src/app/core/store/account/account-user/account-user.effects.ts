import { Injectable } from '@angular/core';
import { HttpErrorResDto } from '@core/models/custom-http.models';
import { AuthService } from '@core/services/auth.service';
import { UserService } from '@core/services/user.service';
import { authUpdateUser } from '@core/store/core/auth/auth.actions';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { NotifierService } from '@shared/services/notifier.service';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { accountUserSaveAction, accountUserSaveFailAction, accountUserSaveSuccessAction } from './account-user.actions';

@Injectable()
export class AccountUserEffects {
  updateUserInfo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(accountUserSaveAction),
      map((action) => action.payload),
      switchMap(({ data }) =>
        this.userService.updateProfile(data).pipe(
          map((res) => accountUserSaveSuccessAction({ payload: { data: res } })),
          catchError((err: HttpErrorResDto) =>
            of(
              accountUserSaveFailAction({
                payload: {
                  error: err.error,
                  message: err.message,
                  statusCode: err.statusCode,
                },
              })
            )
          )
        )
      )
    )
  );

  updateUserInfoSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(accountUserSaveSuccessAction),
      map((action) => action.payload),
      map(({ data }) => authUpdateUser({ payload: data }))
    )
  );

  updateUserInfoFail$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(accountUserSaveFailAction),
        map((action) => action.payload),
        tap((err) => this.notifierService.snackBarError(err.message))
      ),
    { dispatch: false }
  );

  constructor(private actions$: Actions, private notifierService: NotifierService, private userService: UserService) {}
}

import { AppRoutesEnum } from './../../../../app.routes';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import {
  authSingInAction,
  authSingInSuccessAction,
  authSingInFailAction,
  authSingInRedirectAction,
  authLoginAction,
  authLoginSuccessAction,
  authLoginFailAction,
  authSingUpAction,
  authSingUpSuccessAction,
  authSingUpFailAction,
  authLogoutAction,
} from './auth.actions';
import { map, switchMap, catchError, tap, withLatestFrom, debounceTime } from 'rxjs/operators';
import { AuthService } from '@core/services/auth.service';
import { of } from 'rxjs';
import { HttpErrorResDto } from '@core/models/custom-http.models';
import { getLayoutLoginUrl } from '../layout/layout.selectors';
import { Router } from '@angular/router';
import { NotifierService } from '@shared/services/notifier.service';
import { Store, select } from '@ngrx/store';
import { AppState } from '@core/store';
import { MessageEnum } from 'src/config';

@Injectable()
export class AuthEffects {
  singIn$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authSingInAction),
      map((action) => action.payload),
      switchMap(({ formModel }) =>
        this.authService.singIn(formModel).pipe(
          map((res) => authSingInSuccessAction({ payload: { authData: res } })),
          catchError((err: HttpErrorResDto) =>
            of(
              authSingInFailAction({
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

  singInSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authSingInSuccessAction),
      map((action) => action.payload),
      map(({ authData }) => {
        this.authService.setToken(authData.accessToken);
        return authSingInRedirectAction();
      })
    )
  );

  redirect$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(authSingInRedirectAction),
        withLatestFrom(this.store.pipe(select(getLayoutLoginUrl))),
        tap(([action, loginUrl]) => {
          if (loginUrl === `/${AppRoutesEnum.LOGIN}` || loginUrl === `/${AppRoutesEnum.REGISTER}`)
            this.router.navigate([AppRoutesEnum.APP]);
          else this.router.navigateByUrl(loginUrl);
        })
      ),
    { dispatch: false }
  );

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authLoginAction),
      map((action) => action.payload),
      switchMap(({ url }) =>
        this.authService.login().pipe(
          map((res) => {
            return authLoginSuccessAction({
              payload: { user: res, url },
            });
          }),
          catchError(() => of(authLoginFailAction()))
        )
      )
    )
  );

  loginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(authLoginSuccessAction),
        map((action) => action.payload),
        tap(({ user, url }) => this.router.navigateByUrl(url))
      ),
    { dispatch: false }
  );

  loginFail$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(authLoginFailAction),
        tap(() => this.authService.removeToken())
      ),
    { dispatch: false }
  );

  singUp$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authSingUpAction),
      map((action) => action.payload),
      switchMap(({ formModel }) => {
        return this.authService.singUp(formModel).pipe(
          map(() => authSingUpSuccessAction()),
          catchError((err: HttpErrorResDto) =>
            of(
              authSingUpFailAction({
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
        );
      })
    )
  );

  singUpSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(authSingUpSuccessAction),
        tap(() =>
          this.notifierService.snackBarSuccess(MessageEnum.SIGN_UP_SUCCESS)
        ),
        debounceTime(2000),
        tap(() => this.router.navigateByUrl(AppRoutesEnum.LOGIN))
      ),
    { dispatch: false }
  );

  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(authLogoutAction),
        tap(() => {
          this.authService.logout();
          window.location.reload();
        })
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private router: Router,
    private authService: AuthService,
    private notifierService: NotifierService
  ) {}
}

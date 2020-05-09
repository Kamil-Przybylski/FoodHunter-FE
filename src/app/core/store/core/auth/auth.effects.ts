import { AppState } from './../../index';
import { Store, select } from '@ngrx/store';
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
} from './auth.actions';
import {
  map,
  switchMap,
  catchError,
  tap,
  withLatestFrom,
} from 'rxjs/operators';
import { AuthService } from '@core/services/auth.service';
import { of } from 'rxjs';
import { HttpErrorResDto } from '@core/models/custom-http.models';
import { TokenEnum } from 'src/config';
import { getLayoutLoginUrl } from '../layout/layout.selectors';
import { Router } from '@angular/router';
import { AppRoutesEnum } from 'src/app/app.routes';

@Injectable()
export class AuthEffects {
  singIn$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authSingInAction),
      map((action) => action.payload),
      switchMap((credentials) =>
        this.authService.singIn(credentials).pipe(
          map((res) => authSingInSuccessAction({ payload: res })),
          catchError((err: HttpErrorResDto) =>
            of(
              authSingInFailAction({
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

  singInSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authSingInSuccessAction),
      map(({ payload }) => {
        localStorage.setItem(TokenEnum.AUTH, payload.accessToken);
        return authSingInRedirectAction();
      })
    )
  );

  redirect$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(authSingInRedirectAction),
        withLatestFrom(this.store.pipe(select(getLayoutLoginUrl))),
        tap((action) => {
          const loginUrl = '';
          this.router.navigateByUrl(loginUrl);
          if (
            loginUrl === `/${AppRoutesEnum.LOGIN}` ||
            loginUrl === `/${AppRoutesEnum.REGISTER}`
          )
            this.router.navigate([AppRoutesEnum.APP]);
          else this.router.navigateByUrl(loginUrl);
        })
      ),
    { dispatch: false }
  );

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authLoginAction),
      switchMap(({ payload }) =>
        this.authService.login().pipe(
          map((res) => {
            return authLoginSuccessAction({
              payload: { user: res, url: payload },
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
        tap(() => localStorage.removeItem(TokenEnum.AUTH))
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private router: Router,
    private authService: AuthService
  ) {}
}

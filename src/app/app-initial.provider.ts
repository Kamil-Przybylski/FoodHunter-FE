import { select, Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { AppState } from '@core/store';
import { authLoginAction } from '@core/store/core/auth/auth.actions';
import { layoutRouterLoginAction } from '@core/store/core/layout/layout.actions';
import { AuthService } from '@core/services/auth.service';
import { filter, take, tap } from 'rxjs/operators';
import { getAuthIsLogging } from './core/store/core/auth/auth.selectors';

@Injectable()
export class AppInitialProvider {
  constructor(private store: Store<AppState>, private authService: AuthService) {}

  load(): Promise<void> {
    const url = window.location.pathname;
    const token = this.authService.getToken();

    this.store.dispatch(layoutRouterLoginAction({ payload: { url } }));
    if (token) this.store.dispatch(authLoginAction({ payload: { url } }));

    return new Promise((resolve, reject) => {
      if (!token) resolve();
      else {
        this.store.dispatch(authLoginAction({ payload: { url } }));
        this.store
          .pipe(
            select(getAuthIsLogging),
            filter((isLogging) => !isLogging),
            take(1),
            tap(() => resolve())
          )
          .subscribe();
      }
    });
  }
}

export function appInitialProviderFactory(provider: AppInitialProvider) {
  return () => provider.load();
}

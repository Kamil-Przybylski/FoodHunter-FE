import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { AppState } from '@core/store';
import { authLoginAction } from '@core/store/core/auth/auth.actions';
import { layoutRouterLoginAction } from '@core/store/core/layout/layout.actions';
import { AuthService } from '@core/services/auth.service';

@Injectable()
export class AppInitialProvider {
  constructor(private store: Store<AppState>, private authService: AuthService) {}

  load() {
    const url = window.location.pathname;
    const token = this.authService.getToken();

    this.store.dispatch(layoutRouterLoginAction({ payload: { url } }));
    if (token) this.store.dispatch(authLoginAction({ payload: { url } }));
  }
}

export function appInitialProviderFactory(provider: AppInitialProvider) {
  return () => provider.load();
}

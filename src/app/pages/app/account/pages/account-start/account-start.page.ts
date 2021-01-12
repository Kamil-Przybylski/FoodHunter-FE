import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthUser } from '@core/models/auth.models';
import { AppState } from '@core/store';
import { getAccountUserAuthUser } from '@core/store/account/account-user/account-user.selectors';
import { authLogoutAction } from '@core/store/core/auth/auth.actions';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppRoutesEnum } from 'src/app/app.routes';

@Component({
  selector: 'app-account-start',
  templateUrl: './account-start.page.html',
  styles: [],
})
export class AccountStartPage implements OnInit {
  AppRoutesEnum = AppRoutesEnum;

  authUser$!: Observable<AuthUser>;

  constructor(private store: Store<AppState>, public router: Router) {}

  ngOnInit() {
    this.authUser$ = this.store.pipe(select(getAccountUserAuthUser));
  }

  openProfile(userId: number) {
    this.router.navigate([
      '/',
      AppRoutesEnum.APP,
      AppRoutesEnum.TABS,
      AppRoutesEnum.ACCOUNT,
      AppRoutesEnum.INFO,
      userId,
    ]);
  }

  logout() {
    this.store.dispatch(authLogoutAction());
  }
}

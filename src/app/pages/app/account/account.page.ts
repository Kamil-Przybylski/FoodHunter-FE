import { Component, OnInit } from '@angular/core';
import { AppState } from '@core/store';
import { authLogoutAction } from '@core/store/core/auth/auth.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
  }

  logout() {
    this.store.dispatch(authLogoutAction());
  }
  
}

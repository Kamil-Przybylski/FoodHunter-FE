import { AppRoutesEnum } from './../../../../app.routes';
import { Store, select } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { AppState } from '@core/store';
import { AuthFormSingInModel } from '@core/models/auth.models';
import { authSingInAction } from '@core/store/core/auth/auth.actions';
import { Observable } from 'rxjs';
import { getAuthIsLogging } from '@core/store/core/auth/auth.selectors';

@Component({
  selector: 'app-login-card',
  templateUrl: './login-card.component.html',
  styles: [],
})
export class LoginCardComponent implements OnInit {
  AppRoutesEnum = AppRoutesEnum;

  isLogging$!: Observable<boolean>;

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.isLogging$ = this.store.pipe(select(getAuthIsLogging));
  }

  singIn(credetials: AuthFormSingInModel) {
    this.store.dispatch(
      authSingInAction({
        payload: { formModel: credetials },
      })
    );
  }
}

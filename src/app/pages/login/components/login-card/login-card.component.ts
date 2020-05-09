import { Store, select } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { FormLoginModel } from '../login-form/login-form.component';
import { AppState } from '@core/store';
import { ReqSingInDto } from '@core/models/auth.models';
import { authSingInAction } from '@core/store/core/auth/auth.actions';
import { Observable } from 'rxjs';
import { getAuthIsLogging } from '@core/store/core/auth/auth.selectors';

@Component({
  selector: 'app-login-card',
  templateUrl: './login-card.component.html',
  styleUrls: ['./login-card.component.scss'],
})
export class LoginCardComponent implements OnInit {

  isLogging$: Observable<boolean>;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.isLogging$ = this.store.pipe(select(getAuthIsLogging));
  }

  login(credetials: FormLoginModel) {
    this.store.dispatch(authSingInAction({
      payload: new ReqSingInDto(credetials.email, credetials.password)
    }));
  }

}

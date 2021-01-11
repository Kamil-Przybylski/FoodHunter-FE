import { Component, OnInit } from '@angular/core';
import { AppRoutesEnum } from 'src/app/app.routes';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '@core/store';
import { FormSingUpModel } from '../register-form/register-form.component';
import { authSingUpAction } from '@core/store/core/auth/auth.actions';

@Component({
  selector: 'app-register-card',
  templateUrl: './register-card.component.html',
  styles: [],
})
export class RegisterCardComponent implements OnInit {
  AppRoutesEnum = AppRoutesEnum;

  isLogging$: Observable<boolean>;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {}

  singUp(credetials: FormSingUpModel) {
    this.store.dispatch(authSingUpAction({
      payload: credetials
    }));
  }
}

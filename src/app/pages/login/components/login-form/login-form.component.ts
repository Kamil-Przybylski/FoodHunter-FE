import { HttpErrorResDto } from './../../../../core/models/custom-http.models';
import { Component, OnInit, Output, ViewChild, EventEmitter } from '@angular/core';
import { FormControl, Validators, NgForm } from '@angular/forms';
import { FormGroupTypeSafe, FormBuilderTypeSafe } from '@core/utils/form-builder-type-safe';
import { FormErrorUtil } from '@core/utils/form-error.util';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { getAuthIsLogging, getAuthErrors } from '@core/store/core/auth/auth.selectors';
import { AppState } from '@core/store';

enum formFields {
  EMAIL = 'email',
  PASSWORD = 'password'
}
export interface FormLoginModel {
  [formFields.EMAIL]: string;
  [formFields.PASSWORD]: string;
}

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit {
  @ViewChild('formRef', {static: true}) formRef: NgForm;
  @Output() singIn = new EventEmitter<FormLoginModel>();

  form: FormGroupTypeSafe<FormLoginModel>;
  formFields = formFields;

  isLogging$: Observable<boolean>;
  loginErrors$: Observable<HttpErrorResDto>;

  constructor(
    private store: Store<AppState>,
    private fb: FormBuilderTypeSafe,
  ) { }

  ngOnInit() {
    this.isLogging$ = this.store.pipe(select(getAuthIsLogging));
    this.loginErrors$ = this.store.pipe(select(getAuthErrors));

    this.createForm();
  }

  private createForm() {
    this.form = this.fb.group<FormLoginModel>({
      [formFields.EMAIL]: new FormControl(null, Validators.required),
      [formFields.PASSWORD]: new FormControl(null, Validators.required),
    });
  }

  submitForm() {
    this.formRef.onSubmit(new Event('submit'));
  }

  onLogin() {
    if (this.form.valid) {
      this.singIn.emit(this.form.value);
    } else {
      FormErrorUtil.setAllTouched(this.form);
    }
  }

}

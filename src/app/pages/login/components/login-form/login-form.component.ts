import { HttpErrorResDto } from './../../../../core/models/custom-http.models';
import { Component, OnInit, Output, ViewChild, EventEmitter } from '@angular/core';
import { FormControl, Validators, NgForm } from '@angular/forms';
import { FormGroupTypeSafe, FormBuilderTypeSafe } from '@core/utils/form-builder-type-safe';
import { FormErrorUtil } from '@core/utils/form-error.util';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { getAuthIsLogging, getAuthErrors } from '@core/store/core/auth/auth.selectors';
import { AppState } from '@core/store';
import { AuthFormSingInFields, AuthFormSingInModel } from '@core/models/auth.models';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styles: [],
})
export class LoginFormComponent implements OnInit {
  @ViewChild('formRef') formRef!: NgForm;
  @Output() singIn = new EventEmitter<AuthFormSingInModel>();

  form!: FormGroupTypeSafe<AuthFormSingInModel>;
  formFields = AuthFormSingInFields;

  isLogging$!: Observable<boolean>;
  loginErrors$!: Observable<HttpErrorResDto | null>;

  constructor(private store: Store<AppState>, private fb: FormBuilderTypeSafe) {}

  ngOnInit() {
    this.isLogging$ = this.store.pipe(select(getAuthIsLogging));
    this.loginErrors$ = this.store.pipe(select(getAuthErrors));

    this.createForm();
  }

  private createForm() {
    this.form = this.fb.group<AuthFormSingInModel>({
      [this.formFields.EMAIL]: new FormControl(null, Validators.required),
      [this.formFields.PASSWORD]: new FormControl(null, Validators.required),
    });
  }

  submitForm() {
    this.formRef.onSubmit(new Event('submit'));
  }

  onSingIn() {
    if (this.form.valid) {
      this.singIn.emit(this.form.value);
    } else {
      FormErrorUtil.setAllTouched(this.form);
    }
  }
}

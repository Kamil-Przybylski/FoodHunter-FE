import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { NgForm, FormControl, Validators } from '@angular/forms';
import { FormGroupTypeSafe, FormBuilderTypeSafe } from '@core/utils/form-builder-type-safe';
import { Observable, Subject } from 'rxjs';
import { HttpErrorResDto } from '@core/models/custom-http.models';
import { Store, select } from '@ngrx/store';
import { AppState } from '@core/store';
import { FormErrorUtil } from '@core/utils/form-error.util';
import { getAuthIsRegistration, getRegisterErrors } from '@core/store/core/auth/auth.selectors';

enum formFields {
  USERNAME = 'username',
  EMAIL = 'email',
  PASSWORD = 'password',
  REPEAT_PASS = 'repeatPass',
}
export interface FormSingUpModel {
  [formFields.USERNAME]: string;
  [formFields.EMAIL]: string;
  [formFields.PASSWORD]: string;
  [formFields.REPEAT_PASS]: string;
}

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styles: [],
})
export class RegisterFormComponent implements OnInit {
  @ViewChild('formRef') formRef!: NgForm;
  @Output() singUp = new EventEmitter<FormSingUpModel>();

  form!: FormGroupTypeSafe<FormSingUpModel>;
  formFields = formFields;

  isRegistration$!: Observable<boolean>;
  retisterErrors$!: Observable<HttpErrorResDto | null>;

  constructor(private store: Store<AppState>, private fb: FormBuilderTypeSafe) {}

  ngOnInit() {
    this.isRegistration$ = this.store.pipe(select(getAuthIsRegistration));
    this.retisterErrors$ = this.store.pipe(select(getRegisterErrors));

    this.createForm();
  }

  private createForm() {
    this.form = this.fb.group<FormSingUpModel>({
      [formFields.USERNAME]: new FormControl(null, Validators.required),
      [formFields.EMAIL]: new FormControl(null, Validators.required),
      [formFields.PASSWORD]: new FormControl(null, Validators.required),
      [formFields.REPEAT_PASS]: new FormControl(null, Validators.required),
    });
  }

  private checkRepeat() {
    const passControl = this.form.getSafe((x) => x.password);
    const repeatPassControl = this.form.getSafe((x) => x.repeatPass);
    const isEqual = passControl.value === repeatPassControl.value;

    if (!isEqual) repeatPassControl.setErrors({ repeat: true });
    return isEqual;
  }

  submitForm() {
    this.formRef.onSubmit(new Event('submit'));
  }

  onSingUp() {
    if (this.form.valid && this.checkRepeat()) {
      this.singUp.emit(this.form.value);
    } else {
      FormErrorUtil.setAllTouched(this.form);
    }
  }
}

import { Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, NgForm, Validators } from '@angular/forms';
import { AuthFormUserFields, AuthFormUserModel, AuthUser } from '@core/models/auth.models';
import { HttpErrorResDto } from '@core/models/custom-http.models';
import { AppState } from '@core/store';
import {
  getAccountUserAuthUser,
  getAccountUserPhotoDraft,
} from '@core/store/account/account-user/account-user.selectors';
import { FormBuilderTypeSafe, FormGroupTypeSafe } from '@core/utils/form-builder-type-safe';
import { FormErrorUtil } from '@core/utils/form-error.util';
import { select, Store } from '@ngrx/store';
import * as _ from 'lodash';
import { Observable, Subject } from 'rxjs';
import { take, tap } from 'rxjs/operators';

@Component({
  selector: 'app-account-user-form',
  templateUrl: './account-user-form.component.html',
  styles: [],
})
export class AccountUserFormComponent implements OnInit, OnDestroy {
  @ViewChild('formRef') formRef!: NgForm;
  @Output() submitUser = new EventEmitter<AuthFormUserModel>();

  form!: FormGroupTypeSafe<AuthFormUserModel>;
  formFields = AuthFormUserFields;

  user$!: Observable<AuthUser>;

  loginErrors$!: Observable<HttpErrorResDto>;

  destroyed$: Subject<boolean> = new Subject<boolean>();

  constructor(private store: Store<AppState>, private fb: FormBuilderTypeSafe) {}

  ngOnInit() {
    this.user$ = this.store.pipe(select(getAccountUserAuthUser));
    this.user$
      .pipe(
        take(1),
        tap((user) => this.createForm(user))
      )
      .subscribe();
  }

  ngOnDestroy() {
    this.destroyed$.next(true);
  }

  createForm(user: AuthUser) {
    this.form = this.fb.group<AuthFormUserModel>({
      [this.formFields.ID]: new FormControl(user.id, Validators.required),
      [this.formFields.USERNAME]: new FormControl(user.username, Validators.required),
      [this.formFields.EMAIL]: new FormControl(user.email, Validators.required),
      [this.formFields.PHOTO_PATH]: new FormControl(user.photoPath),
      [this.formFields.ABOUT]: new FormControl(user.about),
    });
  }

  submitForm() {
    this.formRef.onSubmit(new Event('submit'));
  }

  submitUserEmmit() {
    if (this.form.valid) {
      const val = _.cloneDeep(this.form.value);
      this.submitUser.emit(val);
    } else {
      FormErrorUtil.setAllTouched(this.form);
    }
  }
}

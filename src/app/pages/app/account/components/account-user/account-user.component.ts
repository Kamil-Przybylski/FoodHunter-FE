import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AuthFormUserFields, AuthFormUserModel, AuthUser } from '@core/models/auth.models';
import { AppState } from '@core/store';
import { getAccountUserAuthUser } from '@core/store/account/account-user/account-user.selectors';
import { FormBuilderTypeSafe, FormGroupTypeSafe } from '@core/utils/form-builder-type-safe';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { take, tap } from 'rxjs/operators';

@Component({
  selector: 'app-account-user',
  templateUrl: './account-user.component.html',
  styleUrls: ['./account-user.component.scss'],
})
export class AccountUserComponent implements OnInit {

  form: FormGroupTypeSafe<AuthFormUserModel>;
  formFields = AuthFormUserFields;
  
  user$: Observable<AuthUser>;

  constructor(
    private store: Store<AppState>,
    private fb: FormBuilderTypeSafe,
  ) { }

  ngOnInit() {
    this.user$ = this.store.pipe(select(getAccountUserAuthUser));
    this.user$.pipe(
      take(1),
      tap(user => this.createForm(user))
    ).subscribe();
  }

  createForm(user: AuthUser) {
    this.form = this.fb.group<AuthFormUserModel>({
      [this.formFields.ID]: new FormControl(user.id, Validators.required),
      [this.formFields.USERNAME]: new FormControl(user.username, Validators.required),
      [this.formFields.EMAIL]: new FormControl(user.email),
      [this.formFields.BIRTH_DATE]: new FormControl(user.birthDate),
      [this.formFields.PHOTO_PATH]: new FormControl(user.photoPath),
      [this.formFields.ABOUT]: new FormControl(user.about, Validators.required),
    });
  }

  onSave() {
    if (this.form.valid) {
      console.log('dziala -> ', this.form);
    } else {
      console.log('nie dziala -> ', this.form);
    }
    
  }

}

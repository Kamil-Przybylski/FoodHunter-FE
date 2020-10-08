import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { AppState } from '@core/store';
import {
  getAuthState,
} from '@core/store/core/auth/auth.selectors';
import { take, map, filter, share } from 'rxjs/operators';
import { FormSingUpModel } from 'src/app/pages/register/register-form/register-form.component';
import { TokenEnum } from 'src/config';
import { HttpDtoService } from './http-dto.service';
import { AuthData, AuthDataDtoModel, AuthFormSingInModel, AuthUser, AuthUserDtoModel } from '@core/models/auth.models';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private postfixes = {
    AUTH: 'auth',
    SING_IN: 'singin',
    SING_UP: 'singup',
    LOGIN: 'login',
  };

  constructor(private httpDtoService: HttpDtoService, private store: Store<AppState>) {}

  singIn(credetials: AuthFormSingInModel): Observable<AuthData> {
    const req = AuthDataDtoModel.getReqSignInDto(credetials.email, credetials.password);

    return this.httpDtoService
      .post<AuthData, AuthDataDtoModel>(AuthDataDtoModel, `${this.postfixes.AUTH}/${this.postfixes.SING_IN}`, req)
      .pipe(share());
  }

  singUp(credetials: FormSingUpModel): Observable<null> {
    const req = AuthDataDtoModel.getReqSingUpDto(credetials.username, credetials.email, credetials.password);

    return this.httpDtoService
      .post<null, AuthDataDtoModel>(AuthDataDtoModel, `${this.postfixes.AUTH}/${this.postfixes.SING_UP}`, req)
      .pipe(share());
  }

  login(): Observable<AuthUser> {
    return this.httpDtoService
      .get<AuthUser, AuthUserDtoModel>(AuthUserDtoModel, `${this.postfixes.AUTH}/${this.postfixes.LOGIN}`)
      .pipe(share());
  }

  isLogged(): Observable<boolean> {
    return this.store.pipe(
      select(getAuthState),
      filter((state) => !state.isLogging),
      take(1),
      map((state) => state.isLoginSuccess)
    );
  }

  setToken(accessToken: string) {
    localStorage.setItem(TokenEnum.AUTH, accessToken);
  }

  getToken() {
    return localStorage.getItem(TokenEnum.AUTH);
  }

  removeToken() {
    return localStorage.getItem(TokenEnum.AUTH);
  }
}

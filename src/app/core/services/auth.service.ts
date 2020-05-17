import { environment } from './../../../environments/environment';
import {
  ReqSingInDto,
  ResSingInDto,
  ResUserDto,
  ReqSingUpDto,
  AuthFormSingInModel,
} from '@core/models/auth.models';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { AppState } from '@core/store';
import {
  getAuthState,
} from '@core/store/core/auth/auth.selectors';
import { take, map, filter } from 'rxjs/operators';
import { FormSingUpModel } from 'src/app/pages/register/register-form/register-form.component';
import { TokenEnum } from 'src/config';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = environment.apiUrl;

  private postfixes = {
    AUTH: 'auth',
    SING_IN: 'singin',
    SING_UP: 'singup',
    LOGIN: 'login',
  };

  constructor(private httpClient: HttpClient, private store: Store<AppState>) {}

  singIn(credetials: AuthFormSingInModel): Observable<ResSingInDto> {
    const req = new ReqSingInDto(credetials.email, credetials.password);
    return this.httpClient.post<ResSingInDto>(
      `${this.baseUrl}/${this.postfixes.AUTH}/${this.postfixes.SING_IN}`,
      req
    );
  }

  singUp(credetials: FormSingUpModel): Observable<null> {
    const req = new ReqSingUpDto(credetials.username, credetials.email, credetials.password);
    return this.httpClient.post<null>(
      `${this.baseUrl}/${this.postfixes.AUTH}/${this.postfixes.SING_UP}`,
      req
    );
  }

  login(): Observable<ResUserDto> {
    return this.httpClient.get<ResUserDto>(
      `${this.baseUrl}/${this.postfixes.AUTH}/${this.postfixes.LOGIN}`
    );
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

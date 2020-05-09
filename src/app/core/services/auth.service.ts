import { environment } from './../../../environments/environment.prod';
import {
  ReqSingInDto,
  ResSingInDto,
  ResUserDto,
} from 'src/app/core/models/auth.models';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { State, select } from '@ngrx/store';
import { AppState } from '@core/store';
import {
  getAuthIsLoginSuccess,
  getAuthState,
} from '@core/store/core/auth/auth.selectors';
import { take, map, filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = environment.apiUrl;

  private postfixes = {
    AUTH: 'auth',
    SING_IN: 'singin',
    LOGIN: 'login',
  };

  constructor(private httpClient: HttpClient, private store: State<AppState>) {}

  singIn(credentials: ReqSingInDto): Observable<ResSingInDto> {
    return this.httpClient.post<ResSingInDto>(
      `${this.baseUrl}/${this.postfixes.AUTH}/${this.postfixes.SING_IN}`,
      credentials
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
}

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { AppState } from '@core/store';
import {
  getAuthState,
} from '@core/store/core/auth/auth.selectors';
import { take, map, filter, share } from 'rxjs/operators';
import { FormSingUpModel } from 'src/app/pages/register/register-form/register-form.component';
import { AuthData, AuthDataDtoModel, AuthFormSingInModel, AuthFormUserModel, AuthUser, AuthUserDtoModel } from '@core/models/auth.models';
import { HttpDtoService } from '@core/utils/http-dto-service';
import { TokenEnum } from '@core/enums/common.enums';
import { PhotoHelper } from '@core/utils/photo.helper';
import { HttpUtil } from '@core/utils/http.util';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private postfixes = {
    AUTH: 'auth',
    SING_IN: 'singin',
    SING_UP: 'singup',
    LOGIN: 'login',

    PHOTO: 'photo',
    INFO: 'info',
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

  logout() {
    this.removeToken();
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
    return localStorage.removeItem(TokenEnum.AUTH);
  }

  updateProfileInfo(payload: AuthFormUserModel): Observable<AuthUser> {
    const req = AuthUserDtoModel.getReqAuthUserUpdateInfoDto(payload);
    return this.httpDtoService.patch<AuthUser, AuthUserDtoModel>(
      AuthUserDtoModel,
      `${this.postfixes.AUTH}/${this.postfixes.INFO}`,
      req
    );
  }

  updateProfilePhoto(photo: string, user: AuthUser): Observable<AuthUser> {
    const file = PhotoHelper.dataURItoBlob(photo, user.username);

    const data = AuthUserDtoModel.getReqAuthUserUpdatePhotoDto(user, file);
    const req = HttpUtil.toFormData(data);

    return this.httpDtoService.patch<AuthUser, AuthUserDtoModel>(
      AuthUserDtoModel,
      `${this.postfixes.AUTH}/${this.postfixes.PHOTO}`,
      req
    );
  }
}

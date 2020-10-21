import { Injectable } from '@angular/core';
import { AuthFormUserModel, AuthUser, AuthUserDtoModel } from '@core/models/auth.models';
import { User, UserShortDtoModel } from '@core/models/user.models';
import { HttpDtoService } from '@core/utils/http-dto-service';
import { HttpUtil } from '@core/utils/http.util';
import { PhotoHelper } from '@core/utils/photo.helper';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private postfixes = {
    USER: 'user',
    PHOTO: 'photo',
    INFO: 'info',
    ADD: 'add',
    REMOVE: 'remove',
  };

  constructor(private httpDtoService: HttpDtoService) {}

  downloadAllFollowers(): Observable<User[]> {
    return this.httpDtoService.get<User[], UserShortDtoModel>(UserShortDtoModel, `${this.postfixes.USER}`);
  }
  downloadUserFollowers(userId: number): Observable<User[]> {
    return this.httpDtoService.get<User[], UserShortDtoModel>(UserShortDtoModel, `${this.postfixes.USER}/${userId}`);
  }

  addUserFollower(userId: number): Observable<User[]> {
    return this.httpDtoService
      .patch<User[], UserShortDtoModel>(
        UserShortDtoModel,
        `${this.postfixes.USER}/${this.postfixes.ADD}/${userId}`,
        null
      )
      .pipe(map((r) => []));
  }

  removeUserFollower(userId: number): Observable<User[]> {
    return this.httpDtoService
      .patch<User[], UserShortDtoModel>(
        UserShortDtoModel,
        `${this.postfixes.USER}/${this.postfixes.REMOVE}/${userId}`,
        null
      )
      .pipe(map((r) => []));
  }

  updateProfileInfo(payload: AuthFormUserModel): Observable<AuthUser> {
    const req = AuthUserDtoModel.getReqAuthUserUpdateInfoDto(payload);
    return this.httpDtoService.patch<AuthUser, AuthUserDtoModel>(
      AuthUserDtoModel,
      `${this.postfixes.USER}/${this.postfixes.INFO}`,
      req
    );
  }

  updateProfilePhoto(photo: string, user: AuthUser): Observable<AuthUser> {
    const file = PhotoHelper.dataURItoBlob(photo, user.username);

    const data = AuthUserDtoModel.getReqAuthUserUpdatePhotoDto(user, file);
    const req = HttpUtil.toFormData(data);

    return this.httpDtoService.patch<AuthUser, AuthUserDtoModel>(
      AuthUserDtoModel,
      `${this.postfixes.USER}/${this.postfixes.PHOTO}`,
      req
    );
  }
}

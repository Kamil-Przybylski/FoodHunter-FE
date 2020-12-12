import { Injectable } from '@angular/core';
import { AuthFormUserModel, AuthUser, AuthUserDtoModel } from '@core/models/auth.models';
import { User, UserDtoModel, UserShort, UserShortDtoModel } from '@core/models/user.models';
import { HttpDtoService } from '@core/utils/http-dto-service';
import { HttpUtil } from '@core/utils/http.util';
import { PhotoHelper } from '@core/utils/photo.helper';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private postfixes = {
    USER: 'user',
    ADD: 'add',
    REMOVE: 'remove',
    FOLLOWERS: 'followers',
    INFO: 'info',
  };

  constructor(private httpDtoService: HttpDtoService) {}

  downloadUser(userId: number): Observable<User[]> {
    return this.httpDtoService
      .get<User, UserDtoModel>(UserDtoModel, `${this.postfixes.USER}/${this.postfixes.INFO}/${userId}`)
      .pipe(map((r) => [r]));
  }

  downloadAllFollowersShort(): Observable<UserShort[]> {
    return this.httpDtoService.get<UserShort[], UserShortDtoModel>(
      UserShortDtoModel,
      `${this.postfixes.USER}/${this.postfixes.FOLLOWERS}`
    );
  }
  downloadUserFollowersShort(userId: number): Observable<UserShort[]> {
    return this.httpDtoService.get<UserShort[], UserShortDtoModel>(
      UserShortDtoModel,
      `${this.postfixes.USER}/${this.postfixes.FOLLOWERS}/${userId}`
    );
  }

  addUserFollower(authUserId: number, userId: number): Observable<User[]> {
    return this.httpDtoService.patch<User[], UserShortDtoModel>(
      UserShortDtoModel,
      `${this.postfixes.USER}/${this.postfixes.FOLLOWERS}/${authUserId}/${this.postfixes.ADD}/${userId}`,
      null
    );
  }

  removeUserFollower(authUserId: number, userId: number): Observable<User[]> {
    return this.httpDtoService.delete<User[], UserShortDtoModel>(
      UserShortDtoModel,
      `${this.postfixes.USER}/${this.postfixes.FOLLOWERS}/${authUserId}/${this.postfixes.REMOVE}/${userId}`
    );
  }
}

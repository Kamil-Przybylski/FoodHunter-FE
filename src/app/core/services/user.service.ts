import { Injectable } from '@angular/core';
import { User, UserDtoModel, UserShort, UserShortDtoModel } from '@core/models/user.models';
import { HttpDtoService } from '@core/utils/http-dto-service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

enum POSTFIXES {
  USER = 'user',
  FOLLOWERS = 'followers',
  INFO = 'info',
  ADD = 'add',
  REMOVE = 'remove',
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private httpDtoService: HttpDtoService) {}

  downloadUser(userId: number): Observable<User[]> {
    return this.httpDtoService
      .get<User, UserDtoModel>(UserDtoModel, `${POSTFIXES.USER}/${POSTFIXES.INFO}/${userId}`)
      .pipe(map((r) => [r]));
  }

  downloadAllFollowersShort(): Observable<UserShort[]> {
    return this.httpDtoService.get<UserShort[], UserShortDtoModel>(
      UserShortDtoModel,
      `${POSTFIXES.USER}/${POSTFIXES.FOLLOWERS}`
    );
  }
  downloadUserFollowersShort(userId: number): Observable<UserShort[]> {
    return this.httpDtoService.get<UserShort[], UserShortDtoModel>(
      UserShortDtoModel,
      `${POSTFIXES.USER}/${POSTFIXES.FOLLOWERS}/${userId}`
    );
  }

  addUserFollower(authUserId: number, userId: number): Observable<User[]> {
    return this.httpDtoService.patch<User[], UserShortDtoModel>(
      UserShortDtoModel,
      `${POSTFIXES.USER}/${POSTFIXES.FOLLOWERS}/${authUserId}/${POSTFIXES.ADD}/${userId}`,
      null
    );
  }

  removeUserFollower(authUserId: number, userId: number): Observable<User[]> {
    return this.httpDtoService.delete<User[], UserShortDtoModel>(
      UserShortDtoModel,
      `${POSTFIXES.USER}/${POSTFIXES.FOLLOWERS}/${authUserId}/${POSTFIXES.REMOVE}/${userId}`
    );
  }
}

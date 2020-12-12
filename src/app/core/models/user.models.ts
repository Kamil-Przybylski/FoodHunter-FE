import { IsStringOrNull } from '@core/decorators/validation.decorator';
import { HttpUtil } from '@core/utils/http.util';
import { Expose, Transform } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';
import { AuthUser } from './auth.models';
import { DtoWrapper } from './custom-http.models';

export interface User {
  id: number;
  username: string;
  about: string;
  photoPath: string;
  foodsCount: number;
  followersCount: number;
}
export class UserDtoModel implements User, DtoWrapper<User> {
  @Expose() @IsNumber() id!: number;
  @Expose() @IsString() username!: string;
  @Expose() @IsStringOrNull() about!: string;
  @Expose()
  @IsStringOrNull()
  @Transform((value) => HttpUtil.getImgUrl(value), { toClassOnly: true })
  photoPath!: string;
  @Expose() @IsNumber() foodsCount!: number;
  @Expose() @IsNumber() followersCount!: number;

  static createUserFromAuthUser(authUser: AuthUser): User {
    return {
      id: authUser.id,
      username: authUser.username,
      about: authUser.about,
      photoPath: authUser.photoPath,
      foodsCount: authUser.foodsCount,
      followersCount: authUser.followersCount,
    };
  }
}

export interface UserShort {
  id: number;
  username: string;
  photoPath: string;
}
export class UserShortDtoModel implements UserShort, DtoWrapper<UserShort> {
  @Expose() @IsNumber() id!: number;
  @Expose() @IsString() username!: string;
  @Expose()
  @IsStringOrNull()
  @Transform((value) => HttpUtil.getImgUrl(value), { toClassOnly: true })
  photoPath!: string;

  static createUserShortFromAuthUser(authUser: AuthUser): UserShort {
    return {
      id: authUser.id,
      username: authUser.username,
      photoPath: authUser.photoPath,
    };
  }
}

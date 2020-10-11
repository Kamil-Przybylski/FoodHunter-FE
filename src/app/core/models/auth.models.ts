import { IsStringOrNull } from '@core/decorators/validation.decorator';
import { Expose, Type } from 'class-transformer';
import { IsNotEmptyObject, IsNumber, IsString, ValidateNested } from 'class-validator';
import { DtoWrapper } from './custom-http.models';

// Auth User
export interface AuthUser {
  id: number;
  username: string;
  email: string;
  birthDate: string;
  photoPath: string;
  about: string;
}
export class AuthUserDtoModel implements AuthUser, DtoWrapper<AuthUser> {
  @Expose() @IsNumber() id: number;
  @Expose() @IsString() username: string;
  @Expose() @IsString() email: string;
  @Expose() @IsStringOrNull() birthDate: string;
  @Expose() @IsStringOrNull() photoPath: string;
  @Expose() @IsStringOrNull() about: string;
}

// Auth Data
export interface AuthData {
  accessToken: string;
  user: AuthUser;
}
export class AuthDataDtoModel implements AuthData, DtoWrapper<AuthData> {
  @Expose() @IsString() accessToken: string;
  @Expose() @Type(() => AuthUserDtoModel) @IsNotEmptyObject() @ValidateNested() user: AuthUser;

  static getReqSignInDto(email: string, password: string) {
    return { email, password };
  }

  static getReqSingUpDto(username: string, email: string, password: string) {
    return { username, email, password };
  }
}

// FORM

export enum AuthFormSingInFields {
  EMAIL = 'email',
  PASSWORD = 'password',
}
export interface AuthFormSingInModel {
  [AuthFormSingInFields.EMAIL]: string;
  [AuthFormSingInFields.PASSWORD]: string;
}

export enum AuthFormUserFields {
  ID = 'id',
  USERNAME = 'username',
  EMAIL = 'email',
  BIRTH_DATE = 'birthDate',
  PHOTO_PATH = 'photoPath',
  ABOUT = 'about',
}
export interface AuthFormUserModel {
  [AuthFormUserFields.ID]: number;
  [AuthFormUserFields.USERNAME]: string;
  [AuthFormUserFields.EMAIL]: string;
  [AuthFormUserFields.BIRTH_DATE]: Date;
  [AuthFormUserFields.PHOTO_PATH]: string;
  [AuthFormUserFields.ABOUT]: string;
}

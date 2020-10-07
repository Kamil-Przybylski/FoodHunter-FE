import { IsStringOrNull } from '@core/decorators/validation.decorator';
import { Expose, Type } from 'class-transformer';
import { IsNumber, IsString, ValidateNested } from 'class-validator';

// Auth User
export interface AuthUser {
  id: number;
  username: string;
  email: string;
  birthDate: string;
  photoPath: string;
  about: string;
}
export class AuthUserDtoModel {
  @Expose() @IsNumber() id: string;
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
export class AuthDataDtoModel {
  @Expose() @IsString() accessToken: string;
  @Expose() @Type(() => AuthUserDtoModel) @ValidateNested() user: AuthUserDtoModel;

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

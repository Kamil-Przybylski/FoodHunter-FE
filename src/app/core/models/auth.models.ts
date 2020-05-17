export class ReqSingInDto {
  constructor(public email: string, public password: string) {}
}

export interface ResSingInDto {
  accessToken: string;
  user: ResUserDto;
}

export interface ResUserDto {
  username: string;
  email: string;
  birthDate: string;
  photoPath: string;
  about: string;
}

export class ReqSingUpDto {
  constructor(public username: string, public email: string, public password: string) {}
}


// FORM

export enum AuthFormSingInFields {
  EMAIL = 'email',
  PASSWORD = 'password'
}
export interface AuthFormSingInModel {
  [AuthFormSingInFields.EMAIL]: string;
  [AuthFormSingInFields.PASSWORD]: string;
}

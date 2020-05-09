import * as moment from 'moment';

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

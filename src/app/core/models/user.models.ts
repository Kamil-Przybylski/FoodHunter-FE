import { IsStringOrNull } from '@core/decorators/validation.decorator';
import { HttpUtil } from '@core/utils/http.util';
import { Expose, Transform } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';
import { DtoWrapper } from './custom-http.models';

export interface User {
  id: number;
  username: string;
  photoPath: string;
}
export class UserDtoModel implements User, DtoWrapper<User> {
  @Expose() @IsNumber() id: number;
  @Expose() @IsString() username: string;
  @Expose() @IsStringOrNull() @Transform((value) => HttpUtil.getImgUrl(value), { toClassOnly: true }) photoPath: string;
}

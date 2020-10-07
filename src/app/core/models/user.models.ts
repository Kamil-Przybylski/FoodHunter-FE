import { IsStringOrNull } from '@core/decorators/validation.decorator';
import { Expose } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';

export interface User {
  id: number;
  username: string;
  photoPath: string;
}
export class UserDtoModel {
  @Expose() @IsNumber() id: string;
  @Expose() @IsString() username: string;
  @Expose() @IsStringOrNull() photoPath: string;
}

import { IsStringOrNull } from '@core/decorators/validation.decorator';
import { Expose } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';
import { DtoWrapper } from './custom-http.models';

export interface FoodTag {
  id: number;
  name: string;
  description: string;
}

export class FoodTagDtoModel implements FoodTag, DtoWrapper<FoodTag> {
  @Expose() @IsNumber() id!: number;
  @Expose() @IsString() name!: string;
  @Expose() @IsStringOrNull() description!: string;
}

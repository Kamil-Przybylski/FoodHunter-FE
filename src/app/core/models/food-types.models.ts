import { IsStringOrNull } from '@core/decorators/validation.decorator';
import { Expose } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';

export interface FoodType {
  id: number;
  name: string;
  description: string;
}

export class FoodTypeDtoModel {
  @Expose() @IsNumber() id: number;
  @Expose() @IsString() name: string;
  @Expose() @IsStringOrNull() description: string;
}

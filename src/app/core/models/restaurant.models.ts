import { Expose } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';
import { DtoWrapper } from './custom-http.models';

export interface Restaurant {
  id: string;
  formattedAddress: string;
  name: string;
  rating: number;
  types: string[];
  url: string;
  website: string;
}
export class RestaurantDtoModel implements Restaurant, DtoWrapper<Restaurant> {
  @Expose() @IsString() id!: string;
  @Expose() @IsString() formattedAddress!: string;
  @Expose() @IsString() name!: string;
  @Expose() @IsNumber() rating!: number;
  @Expose() @IsString({each: true}) types!: string[];
  @Expose() @IsString() url!: string;
  @Expose() @IsString() website!: string;
}

// FORMS

export enum RestaurantFormFields {
  ID = 'id',
  NAME = 'name',
  FORMATTED_ADDRESS = 'formattedAddress',
  RATING = 'rating',
  URL = 'url',
  WEBSITE = 'website',
  TYPES = 'types',
}

export interface RestaurantFormModel {
  [RestaurantFormFields.ID]: string;
  [RestaurantFormFields.NAME]: string;
  [RestaurantFormFields.FORMATTED_ADDRESS]: string | undefined;
  [RestaurantFormFields.RATING]: number | undefined;
  [RestaurantFormFields.URL]: string | undefined;
  [RestaurantFormFields.WEBSITE]: string | undefined;
  [RestaurantFormFields.TYPES]: string[] | undefined;
}

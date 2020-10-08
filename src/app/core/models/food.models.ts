import { FoodState } from '@core/store/food/food.reducer';
import { HttpUtil } from '@core/utils/http.util';
import { Expose, Transform, Type } from 'class-transformer';
import { IsBoolean, IsNumber, IsString, ValidateNested } from 'class-validator';
import { DtoWrapper } from './custom-http.models';
import { Restaurant, RestaurantDtoModel } from './restaurant.models';

export interface Food {
  id: number;
  name: string;
  description: string;
  rate: number;
  isFavorite: boolean;
  isPrivate: boolean;
  isPlanned: boolean;
  photoPath: string;
  createDate: string;

  restaurantId: string;
  restaurant: Restaurant;
  foodTypeId: number;
}
export class FoodDtoModel implements Food, DtoWrapper<Food> {
  @Expose() @IsNumber() id: number;
  @Expose() @IsString() name: string;

  @Expose() @IsString() description: string;
  @Expose() @IsNumber() rate: number;
  @Expose() @IsBoolean() isFavorite: boolean;
  @Expose() @IsBoolean() isPrivate: boolean;
  @Expose() @IsBoolean() isPlanned: boolean;
  @Expose() @IsString() @Transform(value => HttpUtil.getImgUrl(value), { toClassOnly: true }) photoPath: string;
  @Expose() @IsString() createDate: string;

  @Expose() @IsString() restaurantId: string;
  @Expose() @Type(() => RestaurantDtoModel) @ValidateNested() restaurant: Restaurant;
  @Expose() @IsNumber() foodTypeId: number;

  static createTypesString(types: string[]): string {
    return types.join('$$$');
  }

  static getReqFoodDto(state: FoodState, file: File) {
    const food = state.foodDraft.form;
    const restaurant = state.mapDraft.form;

    return {
      name: food.name,
      description: food.description,
      rate: food.rate,
      isFavorite: food.isFavorite,
      isPrivate: food.isPrivate,
      isPlanned: food.isPlanned,
      foodTypeId: food.foodTypeId,

      photo: file,

      restaurantId: restaurant.id,
      restaurantName: restaurant.name,
      restaurantFormattedAddress: restaurant.formattedAddress,
      restaurantRating: restaurant.rating,
      restaurantUrl: restaurant.url,
      restaurantWebsite: restaurant.website,
      restaurantTypes: this.createTypesString(restaurant.types),
    };
  }
}

// FORM 

export enum FoodFormCreateFields {
  NAME = 'name',
  DESCRIPTION = 'description',
  PHOTO = 'photo',
  RATE = 'rate',
  IS_FAVORITE = 'isFavorite',
  IS_PRIVATE = 'isPrivate',
  IS_PLANNED = 'isPlanned',
  RESTAURANT_ID = 'restaurantId',
  FOOD_TYPE_ID = 'foodTypeId',
}

export interface FoodFormCreateModel {
  [FoodFormCreateFields.NAME]: string;
  [FoodFormCreateFields.DESCRIPTION]: string;
  [FoodFormCreateFields.RATE]: number;
  [FoodFormCreateFields.IS_FAVORITE]: boolean;
  [FoodFormCreateFields.IS_PRIVATE]: boolean;
  [FoodFormCreateFields.IS_PLANNED]: boolean;
  [FoodFormCreateFields.FOOD_TYPE_ID]: number;
}

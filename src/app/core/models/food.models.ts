import { FoodState } from '@core/store/food/food.reducer';
import { ResRestaurantDto } from './restaurant.models';

export class ReqFoodDto {
  name: string;
  description: string;
  rate: number;
  isFavorite: boolean;
  isPrivate: boolean;
  isPlanned: boolean;
  foodTypeId: number;

  photo: File;

  restaurantId: string;
  restaurantName: string;
  restaurantFormattedAddress: string;
  restaurantRating: number;
  restaurantUrl: string;
  restaurantWebsite: string;
  restaurantTypes: string;

  constructor(state: FoodState, file: File) {
    const food = state.foodDraft.form;
    const restaurant = state.mapDraft.form;

    this.name = food.name;
    this.description = food.description;
    this.rate = food.rate;
    this.isFavorite = food.isFavorite;
    this.isPrivate = food.isPrivate;
    this.isPlanned = food.isPlanned;
    this.foodTypeId = food.foodTypeId;

    this.photo = file;

    this.restaurantId = restaurant.id;
    this.restaurantName = restaurant.name;
    this.restaurantFormattedAddress = restaurant.formattedAddress;
    this.restaurantRating = restaurant.rating;
    this.restaurantUrl = restaurant.url;
    this.restaurantWebsite = restaurant.website;
    this.restaurantTypes = this.createTypesString(restaurant.types);
  }

  createTypesString(types: string[]): string {
    return types.join('$$$');
  }
}

export interface ResFoodDto {
  id: number;
  name: string;
  description: string;
  rate: number;
  isFavorite: boolean;
  isPrivate: boolean;
  isPlanned: boolean;
  photoPath: string;

  createDate: string;

  restaurantId: number;
  restaurant: ResRestaurantDto;
  foodTypeId: number;
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

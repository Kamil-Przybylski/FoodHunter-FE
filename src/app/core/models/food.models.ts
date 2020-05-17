export class ReqFoodDto {
  name: string;
  description: string;
  rate: number;
  isFavorite: boolean;
  isPrivate: boolean;
  isPlanned: boolean;
  photoPath = '';
  photo: File;

  restaurantId: number;
  foodTypeId: number;

  constructor(form: FoodFormCreateModel) {
    this.name = form.name;
    this.description = form.description;
    this.rate = form.rate;
    this.isFavorite = form.isFavorite;
    this.isPrivate = form.isPrivate;
    this.isPlanned = form.isPlanned;
    this.photo = form.photo;

    this.restaurantId = form.restaurantId;
    this.foodTypeId = form.foodTypeId;
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
  [FoodFormCreateFields.PHOTO]: File;
  [FoodFormCreateFields.RATE]: number;
  [FoodFormCreateFields.IS_FAVORITE]: boolean;
  [FoodFormCreateFields.IS_PRIVATE]: boolean;
  [FoodFormCreateFields.IS_PLANNED]: boolean;
  [FoodFormCreateFields.RESTAURANT_ID]: number;
  [FoodFormCreateFields.FOOD_TYPE_ID]: number;
}

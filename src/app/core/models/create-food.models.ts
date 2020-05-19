import { RestaurantFormModel } from './restaurant.models';
import { FoodFormCreateModel } from './food.models';

export interface FoodPhotoRestaurantModel {
  restaurant: RestaurantFormModel;
  photo: File;
  food: FoodFormCreateModel;
}

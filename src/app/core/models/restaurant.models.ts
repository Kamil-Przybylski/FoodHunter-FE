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
  [RestaurantFormFields.FORMATTED_ADDRESS]: string;
  [RestaurantFormFields.RATING]: number;
  [RestaurantFormFields.URL]: string;
  [RestaurantFormFields.WEBSITE]: string;
  [RestaurantFormFields.TYPES]: string[];
}

export interface ResRestaurantDto {
  formatted_address: string;
  id: string;
  name: string;
  rating: number;
  types: string[];
  url: string;
  website: string;
}
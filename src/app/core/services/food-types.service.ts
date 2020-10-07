import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpDtoService } from './http-dto.service';
import { FoodType, FoodTypeDtoModel } from '@core/models/food-types.models';

@Injectable({
  providedIn: 'root'
})
export class FoodTypesService {
  private postfixes = {
    FOOD_TYPES: 'food-types',
  };
  
  constructor(private httpDtoService: HttpDtoService) { }

  downloadFoodTypes(): Observable<FoodType[]> {
    return this.httpDtoService
      .get<FoodType[]>(FoodTypeDtoModel, this.postfixes.FOOD_TYPES);
  }
}

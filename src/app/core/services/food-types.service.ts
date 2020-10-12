import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FoodType, FoodTypeDtoModel } from '@core/models/food-types.models';
import { HttpDtoService } from '@core/utils/http-dto-service';

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
      .get<FoodType[], FoodTypeDtoModel>(FoodTypeDtoModel, this.postfixes.FOOD_TYPES);
  }
}

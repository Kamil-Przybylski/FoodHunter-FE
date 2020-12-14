import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FoodType, FoodTypeDtoModel } from '@core/models/food-types.models';
import { HttpDtoService } from '@core/utils/http-dto-service';

enum POSTFIXES {
  FOOD_TYPES = 'food-types',
}

@Injectable({
  providedIn: 'root',
})
export class FoodTypesService {
  constructor(private httpDtoService: HttpDtoService) {}

  downloadFoodTypes(): Observable<FoodType[]> {
    return this.httpDtoService.get<FoodType[], FoodTypeDtoModel>(FoodTypeDtoModel, POSTFIXES.FOOD_TYPES);
  }
}

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpUtil } from '@core/utils/http.util';
import * as _ from 'lodash';
import { PhotoHelper } from '@core/utils/photo.helper';
import { Food, FoodDtoModel, FoodPhotoRestaurantModel } from '@core/models/food.models';
import { map } from 'rxjs/operators';
import { HttpPaginator } from '@core/models/custom-http.models';
import { HttpDtoService } from '@core/utils/http-dto-service';

@Injectable({
  providedIn: 'root',
})
export class FoodService {
  private postfixes = {
    FOOD: 'food',
  };

  constructor(private httpDtoService: HttpDtoService) {}

  downloadFoods(page: number, mapFn: (r: HttpPaginator<Food[]>) => Food[]): Observable<Food[]> {
    return this.httpDtoService.getMap<Food[], FoodDtoModel>(FoodDtoModel, this.postfixes.FOOD, mapFn, {
      params: { page: `${page}` },
    });
  }

  createFood(foodForm: FoodPhotoRestaurantModel): Observable<Food[]> {
    const file = PhotoHelper.dataURItoBlob(foodForm.photo, foodForm.food.name);

    const req = FoodDtoModel.getReqFoodDto(foodForm, file);
    const data = HttpUtil.toFormData(req);

    return this.httpDtoService
      .post<Food, FoodDtoModel>(FoodDtoModel, this.postfixes.FOOD, data)
      .pipe(map((res) => [res]));
  }
}

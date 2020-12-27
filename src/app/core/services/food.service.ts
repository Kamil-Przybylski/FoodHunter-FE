import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpUtil } from '@core/utils/http.util';
import * as _ from 'lodash';
import { PhotoHelper } from '@core/utils/photo.helper';
import { Food, FoodDtoModel, FoodPhotoRestaurantModel } from '@core/models/food.models';
import { map } from 'rxjs/operators';
import { HttpPaginator } from '@core/models/custom-http.models';
import { HttpDtoService } from '@core/utils/http-dto-service';

enum POSTFIXES {
  FOOD = 'food',
  USER = 'user',
}

@Injectable({
  providedIn: 'root',
})
export class FoodService {
  constructor(private httpDtoService: HttpDtoService) {}

  downloadFoods(page: number, mapFn: (r: HttpPaginator<Food[]>) => Food[]): Observable<Food[]> {
    return this.httpDtoService.getMap<Food[], FoodDtoModel>(FoodDtoModel, POSTFIXES.FOOD, mapFn, {
      params: { page: `${page}` },
    });
  }

  downloadFood(foodId: number): Observable<Food[]> {
    return this.httpDtoService
      .get<Food, FoodDtoModel>(FoodDtoModel, `${POSTFIXES.FOOD}/${foodId}`)
      .pipe(map((res) => [res]));
  }

  downloadUserFoods(userId: number, page: number, mapFn: (r: HttpPaginator<Food[]>) => Food[]): Observable<Food[]> {
    return this.httpDtoService.getMap<Food[], FoodDtoModel>(
      FoodDtoModel,
      `${POSTFIXES.FOOD}/${POSTFIXES.USER}/${userId}`,
      mapFn,
      {
        params: { page: `${page}` },
      }
    );
  }

  createFood(foodForm: FoodPhotoRestaurantModel): Observable<Food[]> {
    const file = PhotoHelper.dataURItoBlob(foodForm.photo, foodForm.food.name);

    const req = FoodDtoModel.getReqFoodDto(foodForm, file);
    const data = HttpUtil.toFormData(req);

    return this.httpDtoService.post<Food, FoodDtoModel>(FoodDtoModel, POSTFIXES.FOOD, data).pipe(map((res) => [res]));
  }
}

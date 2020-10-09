import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpUtil } from '@core/utils/http.util';
import * as _ from 'lodash';
import { FoodState } from '@core/store/food/food.reducer';
import { PhotoHelper } from '@core/utils/photo.helper';
import { Food, FoodDtoModel } from '@core/models/food.models';
import { HttpDtoService } from './http-dto.service';
import { map } from 'rxjs/operators';
import { HttpPaginator } from '@core/models/custom-http.models';

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

  createFood(payload: FoodState): Observable<Food[]> {
    const file = PhotoHelper.dataURItoBlob(payload.cameraDraft.form, payload.foodDraft.form.name);

    const req = FoodDtoModel.getReqFoodDto(payload, file);
    const data = HttpUtil.toFormData(req);

    return this.httpDtoService
      .post<Food, FoodDtoModel>(FoodDtoModel, this.postfixes.FOOD, data)
      .pipe(map((res) => [res]));
  }
}

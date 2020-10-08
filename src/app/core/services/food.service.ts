import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpUtil } from '@core/utils/http.util';
import * as _ from 'lodash';
import { FoodState } from '@core/store/food/food.reducer';
import { PhotoHelper } from '@core/utils/photo.helper';
import { Food, FoodDtoModel } from '@core/models/food.models';
import { HttpDtoService } from './http-dto.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class FoodService {
  private postfixes = {
    FOOD: 'food',
  };

  constructor(private httpDtoService: HttpDtoService) {}

  downloadFoods(): Observable<Food[]> {
    return this.httpDtoService
      .get<Food[], FoodDtoModel>(FoodDtoModel, this.postfixes.FOOD);
  }

  createFood(payload: FoodState): Observable<Food[]> {
    const file = PhotoHelper.dataURItoBlob(
      payload.cameraDraft.form,
      payload.foodDraft.form.name
    );

    const req = FoodDtoModel.getReqFoodDto(payload, file);
    const data = HttpUtil.toFormData(req);

    return this.httpDtoService
      .post<Food, FoodDtoModel>(FoodDtoModel, this.postfixes.FOOD, data)
      .pipe(map(res => [res]));
  }
}

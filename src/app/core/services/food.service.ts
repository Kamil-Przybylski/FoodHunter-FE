import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import {
  FoodFormCreateModel,
  ReqFoodDto,
  ResFoodDto,
} from '@core/models/food.models';
import { Observable } from 'rxjs';
import { HttpUtil } from '@core/utils/http.util';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root',
})
export class FoodService {
  private baseUrl = environment.apiUrl;

  private postfixes = {
    FOOD: 'food',
  };

  constructor(private httpClient: HttpClient) {}

  downloadFoods(): Observable<ResFoodDto[]> {
    return this.httpClient
      .get<ResFoodDto[]>(`${this.baseUrl}/${this.postfixes.FOOD}`)
      .pipe(map((foods) => HttpUtil.getImgUrl(foods, this.postfixes.FOOD)));
  }

  createFood(payload: FoodFormCreateModel): Observable<ResFoodDto[]> {
    const req = new ReqFoodDto(payload);
    const data = HttpUtil.toFormData(req);

    return this.httpClient
      .post<ResFoodDto>(`${this.baseUrl}/${this.postfixes.FOOD}`, data)
      .pipe(map((res) => [res]));
  }
}

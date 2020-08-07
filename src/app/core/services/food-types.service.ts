import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResFoodTypesDto } from '@core/models/food-types.models';

@Injectable({
  providedIn: 'root'
})
export class FoodTypesService {
  private baseUrl = environment.apiUrl;

  private postfixes = {
    FOOD_TYPES: 'food-types',
  };
  
  constructor(private httpClient: HttpClient) { }

  downloadFoodTypes(): Observable<ResFoodTypesDto[]> {
    return this.httpClient
      .get<ResFoodTypesDto[]>(`${this.baseUrl}/${this.postfixes.FOOD_TYPES}`);
  }
}

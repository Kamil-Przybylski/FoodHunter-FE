import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FoodTag, FoodTagDtoModel } from '@core/models/food-tags.models';
import { HttpDtoService } from '@core/utils/http-dto-service';

enum POSTFIXES {
  TAGS = 'tags',
}

@Injectable({
  providedIn: 'root',
})
export class FoodTagsService {
  constructor(private httpDtoService: HttpDtoService) {}

  downloadFoodTags(): Observable<FoodTag[]> {
    return this.httpDtoService.get<FoodTag[], FoodTagDtoModel>(FoodTagDtoModel, POSTFIXES.TAGS);
  }
}

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FoodTag, FoodTagDtoModel } from '@core/models/food-tags.models';
import { HttpDtoService } from '@core/utils/http-dto-service';

@Injectable({
  providedIn: 'root'
})
export class FoodTagsService {
  private postfixes = {
    TAGS: 'tags',
  };

  constructor(private httpDtoService: HttpDtoService) { }

  downloadFoodTags(): Observable<FoodTag[]> {
    return this.httpDtoService
      .get<FoodTag[], FoodTagDtoModel>(FoodTagDtoModel, this.postfixes.TAGS);
  }

}

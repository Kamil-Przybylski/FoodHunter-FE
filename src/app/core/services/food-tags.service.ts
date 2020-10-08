import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { FoodTag, FoodTagDtoModel } from '@core/models/food-tags.models';
import { HttpDtoService } from './http-dto.service';

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

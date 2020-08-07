import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ResFoodTagsDto } from '@core/models/food-tags.models';

@Injectable({
  providedIn: 'root'
})
export class FoodTagsService {
  private baseUrl = environment.apiUrl;

  private postfixes = {
    TAGS: 'tags',
  };

  constructor(private httpClient: HttpClient) { }

  downloadFoodTags(): Observable<ResFoodTagsDto[]> {
    return this.httpClient
      .get<ResFoodTagsDto[]>(`${this.baseUrl}/${this.postfixes.TAGS}`);
  }

}

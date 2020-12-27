import { Injectable } from '@angular/core';
import { FoodService } from '@core/services/food.service';
import { Actions } from '@ngrx/effects';

@Injectable()
export class DiscoverListEffects {
  constructor(private actions$: Actions) {}
}

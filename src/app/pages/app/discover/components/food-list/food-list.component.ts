import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from '@core/store';
import { foodDownloadAction } from '@core/store/food/food.actions';
import { getAllFoods } from '@core/store/food/food.selectors';
import { Observable } from 'rxjs';
import { Food } from '@core/models/food.models';

@Component({
  selector: 'app-food-list',
  templateUrl: './food-list.component.html',
  styleUrls: ['./food-list.component.scss'],
})
export class FoodListComponent implements OnInit {

  foods$: Observable<Food[]>;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.foods$ = this.store.pipe(select(getAllFoods));

    this.store.dispatch(foodDownloadAction());
  }

}

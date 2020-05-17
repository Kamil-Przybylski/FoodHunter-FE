import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from '@core/store';
import { foodDownloadAction } from '@core/store/food/food.actions';
import { getAllFoods } from '@core/store/food/food.selectors';
import { ResFoodDto } from '@core/models/food.models';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-food-list',
  templateUrl: './food-list.component.html',
  styleUrls: ['./food-list.component.scss'],
})
export class FoodListComponent implements OnInit {

  foods$: Observable<ResFoodDto[]>;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.foods$ = this.store.pipe(select(getAllFoods));

    this.store.dispatch(foodDownloadAction());
  }

}

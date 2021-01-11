import { Component, OnInit, ViewChild } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from '@core/store';
import { foodDownloadAction } from '@core/store/food/food.actions';
import { getAllFoods } from '@core/store/food/food.selectors';
import { Observable } from 'rxjs';
import { Food } from '@core/models/food.models';
import { IonInfiniteScroll } from '@ionic/angular';

@Component({
  selector: 'app-food-list',
  templateUrl: './food-list.component.html',
  styles: [],
})
export class FoodListComponent implements OnInit {
  @ViewChild(IonInfiniteScroll, {static: true}) infiniteScroll: IonInfiniteScroll;
  
  foods$: Observable<Food[]>;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.foods$ = this.store.pipe(select(getAllFoods));

    this.store.dispatch(foodDownloadAction());
  }

  loadData(event) {
    console.log(666, event);
    // setTimeout(() => {
    //   console.log('Done');
    //   event.target.complete();

    //   // App logic to determine if all data is loaded
    //   // and disable the infinite scroll
    //   if (data.length == 1000) {
    //     event.target.disabled = true;
    //   }
    // }, 500);
  }

}

import { Component, OnInit, ViewChild } from '@angular/core';
import { AppState } from '@core/store';
import { foodListDownloadFoodListFoodAction } from '@core/store/food/food-list/food-list.actions';
import { Store } from '@ngrx/store';
import { FoodListComponent } from './components/food-list/food-list.component';

@Component({
  selector: 'app-discover-dashboard',
  templateUrl: './discover-dashboard.page.html',
  styleUrls: ['./discover-dashboard.page.scss'],
})
export class DiscoverDashboardPage implements OnInit {
  @ViewChild(FoodListComponent) foodListComponent: FoodListComponent;

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.downloadData();
  }

  downloadData() {
    if (this.foodListComponent) this.foodListComponent.refreshData();
    this.store.dispatch(foodListDownloadFoodListFoodAction({ payload: { pageNo: 1 } }));
  }
}

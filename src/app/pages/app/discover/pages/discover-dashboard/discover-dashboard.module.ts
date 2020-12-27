import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DiscoverDashboardPageRoutingModule } from './discover-dashboard-routing.module';

import { DiscoverDashboardPage } from './discover-dashboard.page';
import { FoodListComponent } from './components/food-list/food-list.component';
import { FoodListItemComponent } from './components/food-list-item/food-list-item.component';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DiscoverDashboardPageRoutingModule,
    SharedModule
  ],
  declarations: [DiscoverDashboardPage, FoodListComponent, FoodListItemComponent]
})
export class DiscoverDashboardPageModule {}

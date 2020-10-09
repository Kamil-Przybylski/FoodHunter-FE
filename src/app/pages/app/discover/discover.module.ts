import { SharedModule } from './../../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DiscoverPageRoutingModule } from './discover-routing.module';

import { DiscoverPage } from './discover.page';
import { FoodListComponent } from './components/food-list/food-list.component';
import { FoodListContainerComponent } from './components/food-list-container/food-list-container.component';
import { FoodListItemComponent } from './components/food-list-item/food-list-item.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DiscoverPageRoutingModule,
    SharedModule
  ],
  declarations: [DiscoverPage, FoodListContainerComponent, FoodListComponent, FoodListItemComponent]
})
export class DiscoverPageModule {}

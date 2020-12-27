import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DiscoverFoodInfoPageRoutingModule } from './discover-food-info-routing.module';

import { DiscoverFoodInfoPage } from './discover-food-info.page';
import { SharedModule } from '@shared/shared.module';
import { DiscoverFoodDetailsComponent } from './components/discover-food-details/discover-food-details.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DiscoverFoodInfoPageRoutingModule,
    SharedModule
  ],
  declarations: [DiscoverFoodInfoPage, DiscoverFoodDetailsComponent]
})
export class DiscoverFoodInfoPageModule {}

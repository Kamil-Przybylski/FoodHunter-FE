import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DiscoverFoodInfoPage } from './discover-food-info.page';

const routes: Routes = [
  {
    path: '',
    component: DiscoverFoodInfoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DiscoverFoodInfoPageRoutingModule {}

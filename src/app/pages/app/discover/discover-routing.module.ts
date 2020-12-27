import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppRoutesEnum } from 'src/app/app.routes';

import { DiscoverPage } from './discover.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: `${AppRoutesEnum.START}`,
    component: DiscoverPage
  },
  {
    path: `${AppRoutesEnum.START}`,
    loadChildren: () => import('./pages/discover-dashboard/discover-dashboard.module').then( m => m.DiscoverDashboardPageModule)
  },
  {
    path: `${AppRoutesEnum.FOOD}/:${AppRoutesEnum.FOOD_ID}`,
    loadChildren: () => import('./pages/discover-food-info/discover-food-info.module').then( m => m.DiscoverFoodInfoPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DiscoverPageRoutingModule {}

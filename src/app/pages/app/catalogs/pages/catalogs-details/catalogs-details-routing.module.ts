import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CatalogsDetailsPage } from './catalogs-details.page';

const routes: Routes = [
  {
    path: '',
    component: CatalogsDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CatalogsDetailsPageRoutingModule {}

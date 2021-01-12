import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CatalogsListPage } from './catalogs-list.page';

const routes: Routes = [
  {
    path: '',
    component: CatalogsListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CatalogsListPageRoutingModule {}

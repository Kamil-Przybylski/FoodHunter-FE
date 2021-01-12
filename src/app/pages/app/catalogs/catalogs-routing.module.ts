import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppRoutesEnum } from 'src/app/app.routes';

import { CatalogsPage } from './catalogs.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: `${AppRoutesEnum.LIST}`,
    component: CatalogsPage,
  },
  {
    path: `${AppRoutesEnum.LIST}`,
    loadChildren: () => import('./pages/catalogs-list/catalogs-list.module').then((m) => m.CatalogsListPageModule),
  },
  {
    path: `${AppRoutesEnum.CATALOG}/:${AppRoutesEnum.CATALOG_ID}`,
    loadChildren: () =>
      import('./pages/catalogs-details/catalogs-details.module').then((m) => m.CatalogsDetailsPageModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CatalogsPageRoutingModule {}

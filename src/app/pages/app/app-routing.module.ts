import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppPage } from './app.page';
import { AppRoutesEnum } from 'src/app/app.routes';

const routes: Routes = [
  {
    path: AppRoutesEnum.TABS,
    component: AppPage,
    children: [
      {
        path: AppRoutesEnum.DISCOVER,
        loadChildren: () => import('./discover/discover.module').then(m => m.DiscoverPageModule)
      },
      {
        path: AppRoutesEnum.CREATE,
        loadChildren: () => import('./create/create.module').then( m => m.CreatePageModule)
      },
      {
        path: '',
        redirectTo: AppRoutesEnum.DISCOVER
      },
    ]
  },
  {
    path: '',
    redirectTo: AppRoutesEnum.TABS
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppPageRoutingModule {}

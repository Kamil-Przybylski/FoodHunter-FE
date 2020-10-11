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
        path: '',
        redirectTo: AppRoutesEnum.DISCOVER
      },
      {
        path: AppRoutesEnum.DISCOVER,
        loadChildren: () => import('./discover/discover.module').then(m => m.DiscoverPageModule)
      },
      {
        path: AppRoutesEnum.CREATE,
        loadChildren: () => import('./create/create.module').then( m => m.CreatePageModule)
      },
      {
        path: AppRoutesEnum.ACCOUNT,
        loadChildren: () => import('./account/account.module').then( m => m.AccountPageModule)
      },
    ]
  },
  {
    path: '',
    redirectTo: AppRoutesEnum.TABS
  },
  {
    path: 'account',
    loadChildren: () => import('./account/account.module').then( m => m.AccountPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppPageRoutingModule {}

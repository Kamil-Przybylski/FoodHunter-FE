import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppRoutesEnum } from 'src/app/app.routes';

import { AccountPage } from './account.page';

const routes: Routes = [ 
  {
    path: '',
    redirectTo: `${AppRoutesEnum.START}`,
    component: AccountPage
    
  },
  {
    path: `${AppRoutesEnum.START}`,
    loadChildren: () => import('./pages/account-start/account-start.module').then( m => m.AccountStartPageModule)
  },
  {
    path: `${AppRoutesEnum.LIST}`,
    loadChildren: () => import('./pages/account-user-list/account-user-list.module').then( m => m.AccountUserListPageModule)
  },
  {
    path: `${AppRoutesEnum.INFO}/:${AppRoutesEnum.USER_ID}`,
    loadChildren: () => import('./pages/account-user-info/account-user-info.module').then( m => m.AccountUserInfoPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountPageRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccountUserListPage } from './account-user-list.page';

const routes: Routes = [
  {
    path: '',
    component: AccountUserListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountUserListPageRoutingModule {}

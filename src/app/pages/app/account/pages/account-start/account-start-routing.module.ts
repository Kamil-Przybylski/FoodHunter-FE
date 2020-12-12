import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccountStartPage } from './account-start.page';

const routes: Routes = [
  {
    path: '',
    component: AccountStartPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountStartPageRoutingModule {}

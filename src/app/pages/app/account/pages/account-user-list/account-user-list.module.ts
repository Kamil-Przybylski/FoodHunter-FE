import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AccountUserListPageRoutingModule } from './account-user-list-routing.module';

import { AccountUserListPage } from './account-user-list.page';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, AccountUserListPageRoutingModule, SharedModule],
  declarations: [AccountUserListPage],
})
export class AccountUserListPageModule {}

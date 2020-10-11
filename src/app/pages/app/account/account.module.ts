import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AccountPageRoutingModule } from './account-routing.module';

import { AccountPage } from './account.page';
import { SharedModule } from '@shared/shared.module';
import { AccountContainerComponent } from './components/account-container/account-container.component';
import { AccountUserComponent } from './components/account-user/account-user.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AccountPageRoutingModule,
    SharedModule
  ],
  declarations: [AccountPage, AccountContainerComponent, AccountUserComponent]
})
export class AccountPageModule {}
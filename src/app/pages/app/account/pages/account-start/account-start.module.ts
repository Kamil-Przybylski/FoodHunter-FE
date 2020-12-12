import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AccountStartPageRoutingModule } from './account-start-routing.module';

import { AccountStartPage } from './account-start.page';
import { SharedModule } from '@shared/shared.module';
import { UserLogComponent } from './components/user-log/user-log.component';
import { FriendsListComponent } from './components/friends-list/friends-list.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, AccountStartPageRoutingModule, SharedModule],
  declarations: [AccountStartPage, UserLogComponent, FriendsListComponent],
})
export class AccountStartPageModule {}

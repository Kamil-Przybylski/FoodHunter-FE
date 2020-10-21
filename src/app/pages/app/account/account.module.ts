import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AccountPageRoutingModule } from './account-routing.module';

import { AccountPage } from './account.page';
import { SharedModule } from '@shared/shared.module';
import { AccountContainerComponent } from './components/account-container/account-container.component';
import { AccountUserComponent } from './components/account-user/account-user.component';
import { AccountUserFormComponent } from './components/account-user-form/account-user-form.component';
import { AccountUserPhotoComponent } from './components/account-user-photo/account-user-photo.component';
import { AccountUserFormDialogComponent } from './components/account-user-form-dialog/account-user-form-dialog.component';
import { AccountFollowerListComponent } from './components/account-follower-list/account-follower-list.component';
import { AccountFollowerFindComponent } from './components/account-follower-find/account-follower-find.component';
import { AccountFollowerFindDialogComponent } from './components/account-follower-find-dialog/account-follower-find-dialog.component';
import { AccountFollowersComponent } from './components/account-followers/account-followers.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, AccountPageRoutingModule, SharedModule],
  declarations: [
    AccountPage,
    AccountContainerComponent,
    AccountUserComponent,
    AccountUserFormComponent,
    AccountUserPhotoComponent,
    AccountUserFormDialogComponent,
    AccountFollowersComponent,
    AccountFollowerListComponent,
    AccountFollowerFindComponent,
    AccountFollowerFindDialogComponent
  ],
  entryComponents: [AccountUserPhotoComponent, AccountUserFormDialogComponent, AccountFollowerFindDialogComponent]
})
export class AccountPageModule {}

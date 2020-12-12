import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AccountUserInfoPageRoutingModule } from './account-user-info-routing.module';

import { AccountUserInfoPage } from './account-user-info.page';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { UserPostsComponent } from './components/user-posts/user-posts.component';
import { UserEditFormDialogComponent } from './components/user-edit-form-dialog/user-edit-form-dialog.component';
import { UserPhotoFormDialogComponent } from './components/user-photo-form-dialog/user-photo-form-dialog.component';
import { SharedModule } from '@shared/shared.module';
import { UserEditFormComponent } from './components/user-edit-form-dialog/user-edit-form/user-edit-form.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, AccountUserInfoPageRoutingModule, SharedModule],
  declarations: [
    AccountUserInfoPage,
    UserDetailsComponent,
    UserPostsComponent,
    UserEditFormDialogComponent,
    UserPhotoFormDialogComponent,
    UserEditFormComponent,
  ],
})
export class AccountUserInfoPageModule {}

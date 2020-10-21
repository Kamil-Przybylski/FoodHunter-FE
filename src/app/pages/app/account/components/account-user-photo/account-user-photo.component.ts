import { Component, Input, OnInit } from '@angular/core';
import { AuthUser } from '@core/models/auth.models';
import { AppState } from '@core/store';
import { accountUserSavePhotoAction } from '@core/store/account/account-user/account-user.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-account-user-photo',
  templateUrl: './account-user-photo.component.html',
  styleUrls: ['./account-user-photo.component.scss'],
})
export class AccountUserPhotoComponent implements OnInit {
  @Input() user: AuthUser;
  photoData: string;

  constructor(private store: Store<AppState>) {}

  ngOnInit() {}

  imagePick(photoUrl: string) {
    this.photoData = photoUrl;
  }

  checkImage() {
    if (!this.photoData) return;
    else this.store.dispatch(accountUserSavePhotoAction({ payload: { photo: this.photoData, user: this.user } }));
  }
}

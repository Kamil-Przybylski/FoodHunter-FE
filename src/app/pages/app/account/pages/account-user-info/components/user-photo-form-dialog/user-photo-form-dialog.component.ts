import { Component, Input, OnInit } from '@angular/core';
import { AuthUser } from '@core/models/auth.models';
import { AppState } from '@core/store';
import { accountUserSavePhotoAction } from '@core/store/account/account-user/account-user.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-user-photo-form-dialog',
  templateUrl: './user-photo-form-dialog.component.html',
  styleUrls: ['./user-photo-form-dialog.component.scss'],
})
export class UserPhotoFormDialogComponent implements OnInit {
  @Input() user!: AuthUser;
  public photoData: string | null = null;

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

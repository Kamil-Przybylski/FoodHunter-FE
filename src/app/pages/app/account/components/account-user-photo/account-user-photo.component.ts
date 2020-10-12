import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-account-user-photo',
  templateUrl: './account-user-photo.component.html',
  styleUrls: ['./account-user-photo.component.scss'],
})
export class AccountUserPhotoComponent implements OnInit {
  photoData: string;

  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {}

  imagePick(photoUrl: string) {
    this.photoData = photoUrl;
  }

  checkImage() {
    if (!this.photoData) return;
    this.modalCtrl.dismiss({ photoData: this.photoData });
  }
}

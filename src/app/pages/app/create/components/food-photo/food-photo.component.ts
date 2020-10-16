import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-food-photo',
  templateUrl: './food-photo.component.html',
  styleUrls: ['./food-photo.component.scss'],
})
export class FoodPhotoComponent implements OnInit {
  @Output() selectPhoto = new EventEmitter<string>();
  photoData: string;

  constructor() {}

  ngOnInit() {}

  imagePick(photoUrl: string) {
    console.log(666.1);
    this.photoData = photoUrl;
  }

  checkImage() {
    console.log(666.2);

    if (!this.photoData) return;
    this.selectPhoto.emit(this.photoData);
  }
}

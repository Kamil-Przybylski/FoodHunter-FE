import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-food-photo',
  templateUrl: './food-photo.component.html',
  styles: [],
})
export class FoodPhotoComponent implements OnInit {
  @Output() selectPhoto = new EventEmitter<string>();
  photoData!: string;

  constructor() {}

  ngOnInit() {}

  imagePick(photoUrl: string) {
    this.photoData = photoUrl;
  }

  checkImage() {
    if (!this.photoData) return;
    this.selectPhoto.emit(this.photoData);
  }
}

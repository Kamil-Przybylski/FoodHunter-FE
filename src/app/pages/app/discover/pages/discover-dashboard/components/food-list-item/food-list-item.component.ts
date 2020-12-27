import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Food } from '@core/models/food.models';
import { UserShort } from '@core/models/user.models';

@Component({
  selector: 'app-food-list-item',
  templateUrl: './food-list-item.component.html',
  styleUrls: ['./food-list-item.component.scss'],
})
export class FoodListItemComponent implements OnInit {
  @Input() food!: Food;

  @Output() showDetails = new EventEmitter<number>();
  @Output() avatarClick = new EventEmitter<number>();

  constructor() {}

  ngOnInit() {}

  foodClickEmmit() {
    this.showDetails.emit(this.food.id);
  }

  avatarClickEmit(user: UserShort) {
    this.avatarClick.emit(user.id);
  }
}

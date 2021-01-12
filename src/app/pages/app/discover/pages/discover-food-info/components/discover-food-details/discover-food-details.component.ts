import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Food } from '@core/models/food.models';

@Component({
  selector: 'app-discover-food-details',
  templateUrl: './discover-food-details.component.html',
  styles: [],
})
export class DiscoverFoodDetailsComponent implements OnInit {
  @Input() food!: Food;
  @Output() setLike = new EventEmitter<number>();

  constructor() {}

  ngOnInit() {}

  setLikeEmit() {
    this.setLike.emit(this.food.id);
  }
}

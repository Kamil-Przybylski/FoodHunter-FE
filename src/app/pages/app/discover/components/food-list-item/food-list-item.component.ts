import { Component, Input, OnInit } from '@angular/core';
import { Food } from '@core/models/food.models';

@Component({
  selector: 'app-food-list-item',
  templateUrl: './food-list-item.component.html',
  styleUrls: ['./food-list-item.component.scss'],
})
export class FoodListItemComponent implements OnInit {
  @Input() food: Food;

  constructor() { }

  ngOnInit() {}

}

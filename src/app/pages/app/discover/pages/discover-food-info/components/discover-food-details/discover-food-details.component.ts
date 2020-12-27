import { Component, Input, OnInit } from '@angular/core';
import { Food } from '@core/models/food.models';

@Component({
  selector: 'app-discover-food-details',
  templateUrl: './discover-food-details.component.html',
  styleUrls: ['./discover-food-details.component.scss'],
})
export class DiscoverFoodDetailsComponent implements OnInit {
  @Input() food!: Food;

  constructor() { }

  ngOnInit() {}

}

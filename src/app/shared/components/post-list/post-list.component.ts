import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Food } from '@core/models/food.models';
import { IonInfiniteScroll } from '@ionic/angular';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styles: [],
})
export class PostListComponent implements OnInit {
  @ViewChild(IonInfiniteScroll)
  public infiniteScroll!: IonInfiniteScroll;

  @Output() showFoodDetails = new EventEmitter<number>();
  @Output() loadNextData = new EventEmitter<number>();

  @Input() foods!: Food[];

  foods$!: Observable<Food[]>;

  constructor() {}

  ngOnInit() {}

  loadNextDataEmit() {
    this.loadNextData.emit();
  }

  foodClickEmmit(foodId: number) {
    this.showFoodDetails.emit(foodId);
  }
}

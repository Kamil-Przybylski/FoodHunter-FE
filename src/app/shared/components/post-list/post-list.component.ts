import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { HttpPaginatorMeta } from '@core/models/custom-http.models';
import { Food } from '@core/models/food.models';
import { AppState } from '@core/store';
import {
  discoverListDownloadFoodAction,
  discoverListSetPaginatorAction,
} from '@core/store/discover/discover-list/discover-list.actions';
import {
  getDiscoverListAllFoods,
  getDiscoverListDataConditionLoadData,
  getDiscoverListPaginator,
} from '@core/store/discover/discover-list/discover-list.selectors';
import { IonInfiniteScroll } from '@ionic/angular';
import { select, Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { filter, take, takeUntil, tap } from 'rxjs/operators';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss'],
})
export class PostListComponent implements OnInit {
  @ViewChild(IonInfiniteScroll, { static: true })
  public infiniteScroll!: IonInfiniteScroll;

  @Input() foods!: Food[];

  foods$!: Observable<Food[]>;

  constructor() {}

  ngOnInit() {}

  loadNextData() {
    
  }
}

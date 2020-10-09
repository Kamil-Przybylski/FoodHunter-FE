import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from '@core/store';
import { Observable, Subject } from 'rxjs';
import { Food } from '@core/models/food.models';
import { IonInfiniteScroll, IonInfiniteScrollContent } from '@ionic/angular';
import { discoverDownloadFoodAction, discoverSetPaginatorAction } from '@core/store/discover/discover.actions';
import {
  getDiscoverAllFoods,
  getDiscoverDataConditionLoadData,
  getDiscoverPaginator,
} from '@core/store/discover/discover.selectors';
import { HttpPaginatorMeta } from '@core/models/custom-http.models';
import { filter, take, takeUntil, tap } from 'rxjs/operators';

@Component({
  selector: 'app-food-list',
  templateUrl: './food-list.component.html',
  styleUrls: ['./food-list.component.scss'],
})
export class FoodListComponent implements OnInit, OnDestroy {
  @ViewChild(IonInfiniteScroll, { static: true }) infiniteScroll: IonInfiniteScroll;

  foods$: Observable<Food[]>;
  paginator$: Observable<HttpPaginatorMeta>;
  dataCondition$: Observable<HttpPaginatorMeta>;

  destroyed$: Subject<boolean> = new Subject<boolean>();

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.foods$ = this.store.pipe(select(getDiscoverAllFoods));
    this.paginator$ = this.store.pipe(select(getDiscoverPaginator));
    this.dataCondition$ = this.store.pipe(select(getDiscoverDataConditionLoadData));

    this.dataCondition$
      .pipe(
        takeUntil(this.destroyed$),
        filter((loadData) => !!loadData),
        tap((loadData) => this.store.dispatch(discoverSetPaginatorAction({ payload: loadData })))
      )
      .subscribe();

    this.store.dispatch(discoverDownloadFoodAction({ payload: 1 }));
  }

  ngOnDestroy() {
    this.destroyed$.next(true);
  }

  loadNextData(event: CustomEvent) {
    const infiniteScroll: IonInfiniteScroll = event.target as any;

    this.paginator$
      .pipe(
        take(1),
        tap((paginator) => {
          const nextPage = paginator.currentPage + 1;

          infiniteScroll.complete();
          if (paginator.currentPage === paginator.totalPages) infiniteScroll.disabled = true;
          this.store.dispatch(discoverDownloadFoodAction({ payload: nextPage }));
        })
      )
      .subscribe();
  }
}

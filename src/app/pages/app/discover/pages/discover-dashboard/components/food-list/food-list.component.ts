import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from '@core/store';
import { from, Observable, Subject } from 'rxjs';
import { Food } from '@core/models/food.models';
import { IonContent, IonInfiniteScroll, ModalController } from '@ionic/angular';
import { discoverListSetPaginatorAction } from '@core/store/discover/discover-list/discover-list.actions';
import {
  getDiscoverListDataConditionLoadData,
  getDiscoverListPaginator,
} from '@core/store/discover/discover-list/discover-list.selectors';
import { HttpPaginatorMeta } from '@core/models/custom-http.models';
import { filter, take, takeUntil, tap } from 'rxjs/operators';
import { AppRoutesEnum } from 'src/app/app.routes';
import { Router } from '@angular/router';
import {
  foodListDownloadFoodListFoodAction,
  foodListSetLikeForFoodAction,
} from '@core/store/food/food-list/food-list.actions';
import { getFoodListDashboardFoods } from '@core/store/food/food-list/food-list.selectors';

@Component({
  selector: 'app-food-list',
  templateUrl: './food-list.component.html',
  styleUrls: ['./food-list.component.scss'],
})
export class FoodListComponent implements OnInit, OnDestroy {
  @ViewChild(IonInfiniteScroll) infiniteScroll!: IonInfiniteScroll;
  @ViewChild(IonContent) ionContent!: IonContent;

  foods$!: Observable<Food[]>;
  paginator$!: Observable<HttpPaginatorMeta>;
  dataConditionPaginator$!: Observable<HttpPaginatorMeta>;

  destroyed$: Subject<boolean> = new Subject<boolean>();

  constructor(private store: Store<AppState>, public router: Router) {}

  ngOnInit() {
    this.foods$ = this.store.pipe(select(getFoodListDashboardFoods));
    this.paginator$ = this.store.pipe(select(getDiscoverListPaginator));
    this.dataConditionPaginator$ = this.store.pipe(select(getDiscoverListDataConditionLoadData));

    this.donwloadData();
  }

  ngOnDestroy() {
    this.destroyed$.next(true);
  }

  private donwloadData() {
    this.dataConditionPaginator$
      .pipe(
        takeUntil(this.destroyed$),
        filter((paginator) => !!paginator),
        tap((paginator) => {
          this.infiniteScroll.complete();
          this.store.dispatch(discoverListSetPaginatorAction({ payload: { paginator } }));
        })
      )
      .subscribe();
  }

  loadNextData() {
    this.paginator$
      .pipe(
        take(1),
        tap((paginator) => {
          const nextPage = paginator.currentPage + 1;

          if (paginator.isLastForInfiniteScroll) {
            this.infiniteScroll.disabled = true;
          } else {
            this.infiniteScroll.disabled = false;
            this.store.dispatch(foodListDownloadFoodListFoodAction({ payload: { pageNo: nextPage } }));
          }
        })
      )
      .subscribe();
  }

  showDetails(foodId: number) {
    this.router.navigate([
      '/',
      AppRoutesEnum.APP,
      AppRoutesEnum.TABS,
      AppRoutesEnum.DISCOVER,
      AppRoutesEnum.FOOD,
      foodId,
    ]);
  }

  setLike(foodId: number) {
    this.store.dispatch(foodListSetLikeForFoodAction({ payload: { foodId } }));
  }

  openProfile(userId: number) {
    this.router.navigate([
      '/',
      AppRoutesEnum.APP,
      AppRoutesEnum.TABS,
      AppRoutesEnum.ACCOUNT,
      AppRoutesEnum.INFO,
      userId,
    ]);
  }

  refreshData() {
    if (this.infiniteScroll) this.infiniteScroll.disabled = false;
    console.log(666, this.ionContent);
    this.ionContent.scrollToTop();
  }
}

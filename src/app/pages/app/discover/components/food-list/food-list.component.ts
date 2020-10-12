import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from '@core/store';
import { from, Observable, Subject } from 'rxjs';
import { Food } from '@core/models/food.models';
import { IonInfiniteScroll, ModalController } from '@ionic/angular';
import { discoverListDownloadFoodAction, discoverListSetPaginatorAction } from '@core/store/discover/discover-list/discover-list.actions';
import {
  getDiscoverListAllFoods,
  getDiscoverListDataConditionLoadData,
  getDiscoverListPaginator,
} from '@core/store/discover/discover-list/discover-list.selectors';
import { HttpPaginatorMeta } from '@core/models/custom-http.models';
import { filter, take, takeUntil, tap } from 'rxjs/operators';
import { CommentsModalComponent } from '@shared/components/comments-modal/comments-modal.component';

@Component({
  selector: 'app-food-list',
  templateUrl: './food-list.component.html',
  styleUrls: ['./food-list.component.scss'],
})
export class FoodListComponent implements OnInit, OnDestroy {
  @ViewChild(IonInfiniteScroll, { static: true }) infiniteScroll: IonInfiniteScroll;

  foods$: Observable<Food[]>;
  paginator$: Observable<HttpPaginatorMeta>;
  dataConditionPaginator$: Observable<HttpPaginatorMeta>;

  destroyed$: Subject<boolean> = new Subject<boolean>();

  constructor(private store: Store<AppState>, private modalCtrl: ModalController) {}

  ngOnInit() {
    this.foods$ = this.store.pipe(select(getDiscoverListAllFoods));
    this.paginator$ = this.store.pipe(select(getDiscoverListPaginator));
    this.dataConditionPaginator$ = this.store.pipe(select(getDiscoverListDataConditionLoadData));

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

    this.store.dispatch(discoverListDownloadFoodAction({ payload: { pageNo: 1 } }));
  }

  ngOnDestroy() {
    this.destroyed$.next(true);
  }

  loadNextData() {
    this.paginator$
      .pipe(
        take(1),
        tap((paginator) => {
          const nextPage = paginator.currentPage + 1;
          if (paginator.currentPage === paginator.totalPages) this.infiniteScroll.disabled = true;
          this.store.dispatch(discoverListDownloadFoodAction({ payload: { pageNo: nextPage } }));
        })
      )
      .subscribe();
  }

  showComments(food: Food) {
    const modal$ = this.modalCtrl.create({
      component: CommentsModalComponent,
      componentProps: { food },
      swipeToClose: true,
    });
    from(modal$)
      .pipe(
        take(1),
        tap((modal) => modal.present())
      )
      .subscribe();
  }
}

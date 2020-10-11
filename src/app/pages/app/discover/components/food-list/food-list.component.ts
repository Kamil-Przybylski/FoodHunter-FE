import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from '@core/store';
import { from, Observable, Subject } from 'rxjs';
import { Food } from '@core/models/food.models';
import { IonInfiniteScroll, ModalController } from '@ionic/angular';
import { discoverDownloadFoodAction, discoverSetPaginatorAction } from '@core/store/discover/discover.actions';
import {
  getDiscoverAllFoods,
  getDiscoverDataConditionLoadData,
  getDiscoverPaginator,
} from '@core/store/discover/discover.selectors';
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
  dataCondition$: Observable<HttpPaginatorMeta>;

  destroyed$: Subject<boolean> = new Subject<boolean>();

  constructor(private store: Store<AppState>, private modalCtrl: ModalController) {}

  ngOnInit() {
    this.foods$ = this.store.pipe(select(getDiscoverAllFoods));
    this.paginator$ = this.store.pipe(select(getDiscoverPaginator));
    this.dataCondition$ = this.store.pipe(select(getDiscoverDataConditionLoadData));

    this.dataCondition$
      .pipe(
        takeUntil(this.destroyed$),
        filter((loadData) => !!loadData),
        tap((loadData) => {
          this.infiniteScroll.complete();
          this.store.dispatch(discoverSetPaginatorAction({ payload: loadData }));
        })
      )
      .subscribe();

    this.store.dispatch(discoverDownloadFoodAction({ payload: 1 }));
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
          this.store.dispatch(discoverDownloadFoodAction({ payload: nextPage }));
        })
      )
      .subscribe();
  }

  showComments(food: Food) {
    const modal$ = this.modalCtrl.create({
      component: CommentsModalComponent,
      componentProps: { food },
      swipeToClose: true
    });
    from(modal$)
      .pipe(
        take(1),
        tap((modal) => modal.present())
      )
      .subscribe();
  }
}

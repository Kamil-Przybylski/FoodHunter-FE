import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthUser } from '@core/models/auth.models';
import { HttpPaginatorMeta } from '@core/models/custom-http.models';
import { Food } from '@core/models/food.models';
import { User, UserShort } from '@core/models/user.models';
import { AppState } from '@core/store';
import { accountUserDownloadUserAction } from '@core/store/account/account-followers/account-followers.actions';
import {
  getFollowersIsEditMode,
  getFollowersUser,
  getFollowersUserShort,
} from '@core/store/account/account-followers/account-followers.selectors';
import { getAccountUserAuthUser } from '@core/store/account/account-user/account-user.selectors';
import { getLayoutPreviousUrl } from '@core/store/core/layout/layout.selectors';
import { foodListDownloadFoodAction, foodListSetPaginatorAction } from '@core/store/food/food-list/food-list.actions';
import { getFoodListDataConditionLoadData, getFoodListPaginator, getFoodListUserFoods } from '@core/store/food/food-list/food-list.selectors';
import { CommonUtil } from '@core/utils/common.util';
import { ModalController } from '@ionic/angular';
import { select, Store } from '@ngrx/store';
import { PostListComponent } from '@shared/components/post-list/post-list.component';
import { from, Subject } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { filter, take, takeUntil, tap, withLatestFrom } from 'rxjs/operators';
import { AppRoutesEnum } from 'src/app/app.routes';
import { UserEditFormDialogComponent } from './components/user-edit-form-dialog/user-edit-form-dialog.component';
import { UserPhotoFormDialogComponent } from './components/user-photo-form-dialog/user-photo-form-dialog.component';

@Component({
  selector: 'app-account-user-info',
  templateUrl: './account-user-info.page.html',
  styleUrls: ['./account-user-info.page.scss'],
})
export class AccountUserInfoPage implements OnInit, OnDestroy {
  @ViewChild('postListComponent') postListComponent: PostListComponent;

  public AppRoutesEnum = AppRoutesEnum;

  private userId!: number;
  public isBackButtonActive = false;

  public user$!: Observable<User>;
  public authUser$!: Observable<AuthUser>;
  public userShort$!: Observable<UserShort>;
  public isEditMode$!: Observable<boolean>;
  public previousPage$!: Observable<string | null>;

  public paginator$!: Observable<HttpPaginatorMeta>;
  public dataConditionPaginator$!: Observable<HttpPaginatorMeta>;
  public userFoods$!: Observable<Food[]>;

  private destroyed$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private store: Store<AppState>,
    private router: Router,
    private route: ActivatedRoute,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {
    this.userId = CommonUtil.getUrlProp(this.route, AppRoutesEnum.USER_ID);

    this.user$ = this.store.pipe(select(getFollowersUser(this.userId)));
    this.authUser$ = this.store.pipe(select(getAccountUserAuthUser));
    this.userShort$ = this.store.pipe(select(getFollowersUserShort(this.userId)));
    this.isEditMode$ = this.store.pipe(select(getFollowersIsEditMode(this.userId)));
    this.previousPage$ = this.store.pipe(select(getLayoutPreviousUrl));

    this.paginator$ = this.store.pipe(select(getFoodListPaginator));
    this.dataConditionPaginator$ = this.store.pipe(select(getFoodListDataConditionLoadData(this.userId)));
    this.userFoods$ = this.store.pipe(select(getFoodListUserFoods(this.userId)));

    this.downloadData();
  }

  ngOnDestroy() {
    this.destroyed$.next(true);
  }

  private downloadData() {
    this.isEditMode$
      .pipe(
        take(1),
        filter((isEditMode) => !isEditMode),
        tap((isEditMode) => this.store.dispatch(accountUserDownloadUserAction({ payload: { userId: this.userId } })))
      )
      .subscribe();

    this.dataConditionPaginator$
      .pipe(
        takeUntil(this.destroyed$),
        filter((paginator) => !!paginator),
        tap((paginator) => {
          this.postListComponent.infiniteScroll.complete();
          this.store.dispatch(foodListSetPaginatorAction({ payload: { paginator } }));
        })
      )
      .subscribe();
      
    this.store.dispatch(foodListDownloadFoodAction({ payload: { userId: this.userId, pageNo: 1 } }));
  }

  loadNextData() {
    this.paginator$
      .pipe(
        take(1),
        tap((paginator) => {
          const nextPage = paginator.currentPage + 1;
          if (paginator.currentPage === paginator.totalPages) this.postListComponent.infiniteScroll.disabled = true;
          this.store.dispatch(foodListDownloadFoodAction({ payload: { userId: this.userId, pageNo: nextPage } }));
        })
      )
      .subscribe();
  }

  private openEditDialog(user: User) {
    const modal$ = this.modalCtrl.create({
      component: UserEditFormDialogComponent,
      componentProps: { user },
      swipeToClose: true,
    });
    from(modal$)
      .pipe(
        take(1),
        tap((modal) => modal.present())
      )
      .subscribe();
  }

  private openPhotoDialog(user: User) {
    const modal$ = this.modalCtrl.create({
      component: UserPhotoFormDialogComponent,
      componentProps: { user },
      swipeToClose: true,
    });

    from(modal$)
      .pipe(
        take(1),
        tap((modal) => modal.present())
      )
      .subscribe();
  }

  editProfile() {
    this.authUser$
      .pipe(
        take(1),
        withLatestFrom(this.isEditMode$),
        filter(([authUser, isEditMode]) => isEditMode),
        tap(([authUser, isEditMode]) => this.openEditDialog(authUser))
      )
      .subscribe();
  }

  takePhoto() {
    this.authUser$
      .pipe(
        take(1),
        withLatestFrom(this.isEditMode$),
        filter(([authUser, isEditMode]) => isEditMode),
        tap(([authUser, isEditMode]) => this.openPhotoDialog(authUser))
      )
      .subscribe();
  }

  navigateBack() {
    this.previousPage$
      .pipe(
        take(1),
        tap((url) => {
          if (url) this.router.navigateByUrl(url);
          else
            this.router.navigate([
              '/',
              AppRoutesEnum.APP,
              AppRoutesEnum.TABS,
              AppRoutesEnum.ACCOUNT,
              AppRoutesEnum.START,
            ]);
        })
      )
      .subscribe();
  }
}

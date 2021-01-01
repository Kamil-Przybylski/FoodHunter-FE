import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Observable } from 'rxjs';
import { Comments } from '@core/models/comment.model';
import { select, Store } from '@ngrx/store';
import { AppState } from '@core/store';
import { getCommentsByFoodId } from '@core/store/comment/comment.selectors';
import { commentDownloadFoodCommentsAction, commentSaveFoodCommentAction } from '@core/store/comment/comment.actions';
import { CommonUtil } from '@core/utils/common.util';
import { ActivatedRoute } from '@angular/router';
import { AppRoutesEnum } from 'src/app/app.routes';
import { Food } from '@core/models/food.models';
import { foodListDownloadSingleFoodAction, foodListSetLikeForFoodAction } from '@core/store/food/food-list/food-list.actions';
import { getFoodListSingleFood } from '@core/store/food/food-list/food-list.selectors';

@Component({
  selector: 'app-discover-food-info',
  templateUrl: './discover-food-info.page.html',
  styleUrls: ['./discover-food-info.page.scss'],
})
export class DiscoverFoodInfoPage implements OnInit {
  foodId!: number;
  food$!: Observable<Food>;
  comments$!: Observable<Comments[]>;

  constructor(private store: Store<AppState>, private route: ActivatedRoute, public location: Location) {}

  ngOnInit() {
    this.foodId = CommonUtil.getUrlProp(this.route, AppRoutesEnum.FOOD_ID);

    this.food$ = this.store.pipe(select(getFoodListSingleFood(this.foodId)));
    this.comments$ = this.store.pipe(select(getCommentsByFoodId(this.foodId)));

    this.downloadData();
  }

  private downloadData() {
    this.store.dispatch(foodListDownloadSingleFoodAction({ payload: { foodId: this.foodId } }));
    this.store.dispatch(commentDownloadFoodCommentsAction({ payload: { foodId: this.foodId } }));

  }

  sendComment(comment: string) {
    this.store.dispatch(commentSaveFoodCommentAction({ payload: { foodId: this.foodId, comment } }));
  }

  setLike(foodId: number) {
    this.store.dispatch(foodListSetLikeForFoodAction({ payload: { foodId } }));
  }
}

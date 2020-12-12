import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Comments } from '@core/models/comment.model';
import { Food } from '@core/models/food.models';
import { AppState } from '@core/store';
import { commentDownloadFoodCommentsAction, commentSaveFoodCommentAction } from '@core/store/comment/comment.actions';
import { getCommentsByFoodId } from '@core/store/comment/comment.selectors';
import { ModalController } from '@ionic/angular';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppRoutesEnum } from 'src/app/app.routes';

@Component({
  selector: 'app-comments-modal',
  templateUrl: './comments-modal.component.html',
  styleUrls: ['./comments-modal.component.scss'],
})
export class CommentsModalComponent implements OnInit {
  @Input() food!: Food;

  commentFormControl = new FormControl('', [Validators.required]);

  comments$!: Observable<Comments[]>;

  constructor(private store: Store<AppState>, public router: Router, private modalCtrl: ModalController) {}

  ngOnInit() {
    this.comments$ = this.store.pipe(select(getCommentsByFoodId(this.food.id)));

    this.store.dispatch(commentDownloadFoodCommentsAction({ payload: { foodId: this.food.id } }));
  }

  sendComment() {
    if (this.commentFormControl.valid) {
      this.store.dispatch(
        commentSaveFoodCommentAction({ payload: { foodId: this.food.id, comment: this.commentFormControl.value } })
      );
    } else {
      this.commentFormControl.markAsTouched();
    }
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
}

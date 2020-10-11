import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { IComment } from '@core/models/comment.model';
import { Food } from '@core/models/food.models';
import { AppState } from '@core/store';
import { commentDownloadFoodCommentsAction, commentSaveFoodCommentAction } from '@core/store/comment/comment.actions';
import { getCommentsByFoodId } from '@core/store/comment/comment.selectors';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-comments-modal',
  templateUrl: './comments-modal.component.html',
  styleUrls: ['./comments-modal.component.scss'],
})
export class CommentsModalComponent implements OnInit {
  @Input() food: Food;

  commentFormControl = new FormControl('', [Validators.required]);

  comments$: Observable<IComment[]>;

  avatarPath =
  // tslint:disable-next-line: max-line-length
    'https://vignette.wikia.nocookie.net/james-camerons-avatar/images/d/d4/Neytiri_Profil.jpg/revision/latest/top-crop/width/360/height/450?cb=20100226001342&path-prefix=pl';

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.comments$ = this.store.pipe(select(getCommentsByFoodId(this.food.id)));

    this.store.dispatch(commentDownloadFoodCommentsAction({payload: {foodId: this.food.id}}));
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
}

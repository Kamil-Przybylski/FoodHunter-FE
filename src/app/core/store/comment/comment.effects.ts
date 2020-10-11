import { Injectable } from '@angular/core';
import { CommentService } from '@core/services/comment.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map } from 'rxjs/operators';
import { downloadAction, saveAction } from '../core/data-condition/data-condition.actions';
import { EntitiesEnum } from '../core/entities/entities.models';
import { commentDownloadFoodCommentsAction, commentSaveFoodCommentAction } from './comment.actions';

@Injectable()
export class CommentEffects {

  downloadFoodComments$ = createEffect(() => 
    this.actions$.pipe(
      ofType(commentDownloadFoodCommentsAction),
      map((action) => action.payload),
      map(({foodId}) => downloadAction()({
        key: EntitiesEnum.COMMENT,
        dataId: foodId,
        requestObservable: this.commentService.downloadComments(foodId)
      }))
    )
  ); 

  saveFoodComment$ = createEffect(() => 
    this.actions$.pipe(
      ofType(commentSaveFoodCommentAction),
      map((action) => action.payload),
      map(({foodId, comment}) => saveAction()({
        key: EntitiesEnum.COMMENT,
        dataId: foodId,
        requestObservable: this.commentService.createComment(foodId, comment)
      }))
    )
  );


  constructor(private actions$: Actions, private commentService: CommentService) {}
}

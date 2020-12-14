import { Injectable } from '@angular/core';
import { CommentDtoModel, Comments } from '@core/models/comment.model';
import { HttpDtoService } from '@core/utils/http-dto-service';
import { Observable } from 'rxjs';

enum POSTFIXES {
  FOOD = 'food',
  COMMENTS = 'comments',
}

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  constructor(private httpDtoService: HttpDtoService) {}

  downloadComments(foodId: number): Observable<Comments[]> {
    return this.httpDtoService.get<Comments[], CommentDtoModel>(
      CommentDtoModel,
      `${POSTFIXES.COMMENTS}/${POSTFIXES.FOOD}/${foodId}`
    );
  }

  createComment(foodId: number, comment: string): Observable<Comments[]> {
    const req = CommentDtoModel.getReqFoodDto(foodId, comment);

    return this.httpDtoService.post<Comments[], CommentDtoModel>(CommentDtoModel, POSTFIXES.COMMENTS, req);
  }
}

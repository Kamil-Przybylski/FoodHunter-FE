import { Injectable } from '@angular/core';
import { CommentDtoModel, IComment } from '@core/models/comment.model';
import { HttpDtoService } from '@core/utils/http-dto-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  private postfixes = {
    FOOD: 'food',
    COMMENTS: 'comments',
  };

  constructor(private httpDtoService: HttpDtoService) {}

  downloadComments(foodId: number): Observable<IComment[]> {
    return this.httpDtoService.get<IComment[], CommentDtoModel>(
      CommentDtoModel,
      `${this.postfixes.COMMENTS}/${this.postfixes.FOOD}/${foodId}`
    );
  }

  createComment(foodId: number, comment: string): Observable<IComment[]> {
    const req = CommentDtoModel.getReqFoodDto(foodId, comment);

    return this.httpDtoService
      .post<IComment[], CommentDtoModel>(CommentDtoModel, this.postfixes.COMMENTS, req);
  }
}

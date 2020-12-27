import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Comments } from '@core/models/comment.model';
import { AppRoutesEnum } from 'src/app/app.routes';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.scss'],
})
export class CommentListComponent implements OnInit {
  @Input() comments!: Comments[];
  @Output() sendComment = new EventEmitter<string>();

  commentFormControl = new FormControl('', [Validators.required]);

  constructor(public router: Router) {}

  ngOnInit() {}

  sendCommentEmit() {
    if (this.commentFormControl.valid) {
      this.sendComment.emit(this.commentFormControl.value);
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

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserShort } from '@core/models/user.models';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styles: [],
})
export class UserListComponent implements OnInit {
  @Input() userShortList!: UserShort[];
  @Input() isForAddFriend!: boolean;
  @Input() isForRemoveFriend!: boolean;

  @Output() addUser = new EventEmitter<UserShort>();
  @Output() removeUser = new EventEmitter<UserShort>();
  @Output() avatarClick = new EventEmitter<number>();

  constructor() {}

  ngOnInit() {}

  addEmit(user: UserShort) {
    this.addUser.emit(user);
  }

  removeEmit(user: UserShort) {
    this.removeUser.emit(user);
  }

  avatarClickEmit(user: UserShort) {
    this.avatarClick.emit(user.id);
  }
}

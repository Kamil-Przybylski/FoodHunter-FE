import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserShort } from '@core/models/user.models';

@Component({
  selector: 'app-account-follower-list',
  templateUrl: './account-follower-list.component.html',
  styleUrls: ['./account-follower-list.component.scss'],
})
export class AccountFollowerListComponent implements OnInit {
  @Input() userShortList!: UserShort[] | null;
  @Input() isForAdd!: boolean;
  @Input() isForRemove!: boolean;

  @Output() addUser = new EventEmitter<UserShort>();
  @Output() removeUser = new EventEmitter<UserShort>();

  constructor() {}

  ngOnInit() {}

  addEmmit(user: UserShort) {
    this.addUser.emit(user);
  }

  removeEmmit(user: UserShort) {
    this.removeUser.emit(user);
  }
}

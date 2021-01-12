import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AuthUser } from '@core/models/auth.models';
import { User } from '@core/models/user.models';

@Component({
  selector: 'app-account-user',
  templateUrl: './account-user.component.html',
  styles: [],
})
export class AccountUserComponent implements OnInit {
  @Input() user!: User | AuthUser;

  @Output() avatarClick = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  avatarClickEmmit() {
    this.avatarClick.emit();
  }

}

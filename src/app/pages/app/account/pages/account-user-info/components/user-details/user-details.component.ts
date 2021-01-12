import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from '@core/models/user.models';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styles: [],
})
export class UserDetailsComponent implements OnInit {
  @Input() user!: User;
  @Input() isEditMode: boolean = false;

  @Output() avatarClick = new EventEmitter();

  constructor() { }

  ngOnInit() {}

  avatarClickEmmit() {
    this.avatarClick.emit();
  }

}

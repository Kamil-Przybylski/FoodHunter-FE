import { Component, Input, OnInit } from '@angular/core';
import { AppState } from '@core/store';
import { authLogoutction } from '@core/store/core/auth/auth.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styles: [],
})
export class ToolbarComponent implements OnInit {
  @Input() title: string;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {}

  logout() {
    this.store.dispatch(authLogoutction());
  }

}

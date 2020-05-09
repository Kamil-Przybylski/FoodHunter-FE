import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  destroyed$: Subject<boolean> = new Subject<boolean>();

  constructor() {}

  ngOnInit() {}
}

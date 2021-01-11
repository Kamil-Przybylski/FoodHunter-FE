import { Component, OnInit } from '@angular/core';
import { AppRoutesEnum } from 'src/app/app.routes';

@Component({
  selector: 'app-app',
  templateUrl: './app.page.html',
  styles: [],
})
export class AppPage implements OnInit {
  AppRoutesEnum = AppRoutesEnum;
  
  constructor() { }

  ngOnInit() {
  }

}

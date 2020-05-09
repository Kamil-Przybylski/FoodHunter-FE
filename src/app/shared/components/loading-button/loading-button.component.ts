import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-loading-button',
  templateUrl: './loading-button.component.html',
  styleUrls: ['./loading-button.component.scss'],
})
export class LoadingButtonComponent implements OnInit {
  @Input() isLoading: boolean;
  diamer = 20;

  constructor() { }

  ngOnInit() {}

}

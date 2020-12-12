import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-empty-state',
  templateUrl: './empty-state.component.html',
  styleUrls: ['./empty-state.component.scss'],
})
export class EmptyStateComponent implements OnInit {
  @Input() loading: boolean;
  @Input() message: string = 'Brak danych do wyświetlenia';
  @Input() subMessage: string = 'Kliknij przycisk "Dodaj" aby wprowadzić nowe dane';
  @Input() size: number = 100;
  
  constructor() { }

  ngOnInit() {}

}

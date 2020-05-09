import { HttpErrorResDto } from './../../../core/models/custom-http.models';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-form-errors',
  templateUrl: './form-errors.component.html',
  styleUrls: ['./form-errors.component.scss'],
})
export class FormErrorsComponent implements OnInit {
  @Input() error: HttpErrorResDto;
  @Input() isFormSubmitted: boolean;
  @Input() isFormValid: boolean;

  constructor() { }

  ngOnInit() {}

}

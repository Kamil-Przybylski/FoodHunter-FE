import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { FormGroupTypeSafe, FormBuilderTypeSafe } from '@core/utils/form-builder-type-safe';
import { Store, select } from '@ngrx/store';
import { AppState } from '@core/store';
import { FormControl, Validators, NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { HttpErrorResDto } from '@core/models/custom-http.models';
import { FormErrorUtil } from '@core/utils/form-error.util';
import { FoodFormCreateModel, FoodFormCreateFields } from '@core/models/food.models';
import { getFoodConditionIsSending, getFoodConditionSendErrors } from '@core/store/food/food.selectors';

@Component({
  selector: 'app-food-form',
  templateUrl: './food-form.component.html',
  styleUrls: ['./food-form.component.scss'],
})
export class FoodFormComponent implements OnInit {
  @ViewChild('formRef', {static: true}) formRef: NgForm;
  @Output() save = new EventEmitter<FoodFormCreateModel>();

  form: FormGroupTypeSafe<FoodFormCreateModel>;
  formFields = FoodFormCreateFields;

  isSending$: Observable<boolean>;
  hasErrors$: Observable<HttpErrorResDto>;

  constructor(
    private store: Store<AppState>,
    private fb: FormBuilderTypeSafe,
  ) { }

  ngOnInit() {
    this.isSending$ = this.store.pipe(select(getFoodConditionIsSending));
    this.hasErrors$ = this.store.pipe(select(getFoodConditionSendErrors));

    this.createForm();
  }

  private createForm() {
    this.form = this.fb.group<FoodFormCreateModel>({
      [this.formFields.NAME]: new FormControl('', Validators.required),
      [this.formFields.DESCRIPTION]: new FormControl('', Validators.maxLength(255)),
      [this.formFields.PHOTO]: new FormControl(null),
      [this.formFields.RATE]: new FormControl(6, [Validators.required]),
      [this.formFields.IS_FAVORITE]: new FormControl(false, Validators.required),
      [this.formFields.IS_PRIVATE]: new FormControl(false, Validators.required),
      [this.formFields.IS_PLANNED]: new FormControl(false, Validators.required),
      [this.formFields.RESTAURANT_ID]: new FormControl(1, Validators.required),
      [this.formFields.FOOD_TYPE_ID]: new FormControl(1, Validators.required),
    });
  }

  getFile(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.get(this.formFields.PHOTO).setValue(file);
  }

  submitForm() {
    this.formRef.onSubmit(new Event('submit'));
  }

  onSave() {
    if (this.form.valid) {
      this.save.emit(this.form.value);
    } else {
      FormErrorUtil.setAllTouched(this.form);
    }
  }

}

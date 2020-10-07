import { Component, OnInit, ViewChild, Output, EventEmitter, Input } from '@angular/core';
import { FormGroupTypeSafe, FormBuilderTypeSafe } from '@core/utils/form-builder-type-safe';
import { Store, select } from '@ngrx/store';
import { AppState } from '@core/store';
import { FormControl, Validators, NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { HttpErrorResDto } from '@core/models/custom-http.models';
import { FormErrorUtil } from '@core/utils/form-error.util';
import { FoodFormCreateModel, FoodFormCreateFields } from '@core/models/food.models';
import { getFoodConditionIsSending, getFoodConditionSendErrors } from '@core/store/food/food.selectors';
import { FoodDraftState } from '@core/store/food/food.reducer';
import { FoodType } from '@core/models/food-types.models';

@Component({
  selector: 'app-food-form',
  templateUrl: './food-form.component.html',
  styleUrls: ['./food-form.component.scss'],
})
export class FoodFormComponent implements OnInit {
  @Input() foodTypes$: Observable<FoodType[]>;
  @ViewChild('formRef', {static: true}) formRef: NgForm;
  @Output() save = new EventEmitter<FoodDraftState>();

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
      [this.formFields.RATE]: new FormControl(5, [Validators.required]),
      [this.formFields.IS_FAVORITE]: new FormControl(false, Validators.required),
      [this.formFields.IS_PRIVATE]: new FormControl(false, Validators.required),
      [this.formFields.IS_PLANNED]: new FormControl(false, Validators.required),
      [this.formFields.FOOD_TYPE_ID]: new FormControl(null, Validators.required),
    });
  }

  submitForm() {
    this.formRef.onSubmit(new Event('submit'));
  }

  onSave() {
    if (this.form.valid) {
      this.save.emit({
        form: this.form.value,
        isValid: this.form.valid
      });
    } else {
      FormErrorUtil.setAllTouched(this.form);
    }
  }

}

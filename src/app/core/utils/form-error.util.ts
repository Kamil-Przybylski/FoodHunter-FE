import { FormGroup, FormArray, AbstractControl } from '@angular/forms';
import * as _ from 'lodash';

export class FormErrorUtil {
  static setAllTouched(form: FormGroup | FormArray): void {
    for (const controlKey in form.controls) {
      if (controlKey && !_.isArray(form.controls)) {
        const control: AbstractControl = form.controls[controlKey];
        if (control.hasOwnProperty('controls')) {
          this.setAllTouched(control as FormGroup | FormArray);
        } else {
          control.markAsTouched();
        }
      }  else if (_.isArray(form.controls)) {
        _.forEach(form.controls, control => this.setAllTouched(control as FormGroup | FormArray));
      }
    }
  }

  static setAllUntouched(form: FormGroup): void {
    for (const controlKey in form.controls) {
      if (controlKey) {
        const control: AbstractControl = form.controls[controlKey];
        if (control.hasOwnProperty('controls')) {
          this.setAllTouched(control as FormGroup);
        } else {
          control.markAsUntouched();
        }
      }
    }
  }
}

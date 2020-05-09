import { FormGroup, FormArray, AbstractControl } from '@angular/forms';

export class FormErrorUtil {
  static setAllTouched(form: FormGroup | FormArray): void {
    for (const controlKey in form.controls) {
      if (controlKey) {
        const control: AbstractControl = form.controls[controlKey];
        if (control.hasOwnProperty('controls')) {
          this.setAllTouched(control as FormGroup);
        } else {
          control.markAsTouched();
        }
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

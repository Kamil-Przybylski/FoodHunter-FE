import { Injectable } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, AbstractControl, FormArray } from '@angular/forms';
import { Observable } from 'rxjs';

export type FormGroupControlsOf<T> = {
  [P in keyof T]: FormControl | FormGroup | FormArray;
};

export abstract class FormGroupTypeSafe<T> extends FormGroup {
  // give the value a custom type s
  value: T;

  // create helper methods to achieve this syntax eg: this.form.getSafe(x => x.heroName).patchValue('Himan')
  public abstract getSafe(propertyFunction: (typeVal: T) => any): AbstractControl;
  public abstract setControlSafe(propertyFunction: (typeVal: T) => any, control: AbstractControl): void;
  
  // If you need more function implement declare them here but implement them on FormBuilderTypeSafe.group instantiation.
  public abstract clearFormArray(formArray: FormArray): void;
  public abstract valueSafeChanges(): Observable<T>;
}

export class FormControlTypeSafe<T> extends FormControl {
  value: T;
}

@Injectable({
  providedIn: 'root',
})
export class FormBuilderTypeSafe extends FormBuilder {
  group<T>(
    controlsConfig: FormGroupControlsOf<T>,
    extra?: {
      [key: string]: any;
    } | null
  ): FormGroupTypeSafe<T> {
    /*NOTE the return FormGroupTypeSafe<T> */

    // instantiate group from angular type
    const gr = super.group(controlsConfig, extra) as FormGroupTypeSafe<T>;

    const getPropertyName = (propertyFunction: (T) => any): string => {
      // https://github.com/dsherret/ts-nameof - helped me with the code below, THANX!!!!
      // propertyFunction.toString() sample value:
      //  function(x) { return x.hero.address.postcode;}
      // we need the 'hero.address.postcode'
      // for gr.get('hero.address.postcode') function
      const properties = propertyFunction
        .toString()
        .match(/(?![. ])(([a-z0-9_]+)(?=[};.])|(([a-z0-9_]+)$))/gi)
        .splice(1);

      const r = properties.join('.');
      return r;
    };

    if (gr) {
      // implement getSafe method
      gr.getSafe = (propertyFunction: (typeVal: T) => any): AbstractControl => {
        const getStr = getPropertyName(propertyFunction);
        const p = gr.get(getStr) as FormGroupTypeSafe<T>;
        return p;
      };

      // implement setControlSafe
      gr.setControlSafe = (propertyFunction: (typeVal: T) => any, control: AbstractControl): void => {
        const getStr = getPropertyName(propertyFunction);
        gr.setControl(getStr, control);
      };

      // implement more functions as needed
      gr.clearFormArray = (formArray: FormArray): void => {
        if (!formArray) return;
        while (formArray.length !== 0) {
          formArray.removeAt(0);
        }
      };

      gr.valueSafeChanges = (): Observable<T> => {
        return gr.valueChanges as Observable<T>;
      };
    }

    return gr;
  }
}

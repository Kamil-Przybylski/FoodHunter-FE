import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';
import * as _ from 'lodash';

export function IsIntOrNull(validationOptions?: ValidationOptions) {
  return (object: object, propertyName: string) => {
    registerDecorator({
      name: 'isIntOrNull',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: unknown, ) {
          return _.isInteger(value) || _.isNull(value);
        },
      },
    });
  };
}

export function IsStringOrNull(validationOptions?: ValidationOptions) {
  return (object: object, propertyName: string) => {
    registerDecorator({
      name: 'isStringOrNull',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: unknown, ) {
          return _.isString(value) || _.isNull(value);
        },
      },
    });
  };
}

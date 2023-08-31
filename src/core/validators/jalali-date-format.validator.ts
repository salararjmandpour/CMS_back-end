import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidationArguments,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'jalaliDateFormat', async: false })
export class JalaliDateFormatConstraint
  implements ValidatorConstraintInterface
{
  validate(date: string, args: ValidationArguments) {
    if (!date) {
      return true; // It's optional, so no validation needed if it's not provided
    }

    const regex = /^\d{4}\/\d{2}\/\d{2}$/; // Regular expression for yy/mm/dd format
    return regex.test(date);
  }

  defaultMessage(args: ValidationArguments) {
    return `Invalid date format. The date should be in yyyy/mm/dd format.`;
  }
}

export function IsJalaliDateFormat(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: JalaliDateFormatConstraint,
    });
  };
}

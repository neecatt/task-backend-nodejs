// is-true.validator.ts
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ name: 'isTrue', async: false })
export class IsTrueConstraint implements ValidatorConstraintInterface {
  validate(value: boolean) {
    return value === true;
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} must be true`;
  }
}

import {
  ArrayNotEmpty,
  IsBoolean,
  IsNumber,
  IsString,
  Validate,
} from 'class-validator';
import { IsTrueConstraint } from 'src/helpers/is-true.validator';

export class CreateFormEntryDto {
  @IsString()
  name: string;

  @IsBoolean()
  @Validate(IsTrueConstraint)
  agreeTerms: boolean;

  @IsNumber({}, { each: true })
  @ArrayNotEmpty()
  sectors: number[];
}

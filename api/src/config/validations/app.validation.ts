import { IsEnum, IsNumber, IsPositive } from 'class-validator';
import { IEnvironment } from '../interfaces/app.interface';
import {
  createEnumErrorMessageFormatter,
  createErrorMessageFormatter,
} from 'src/utils/validation/validate-util';

export class AppEnvironmentVariables {
  @IsEnum(IEnvironment, {
    message: createEnumErrorMessageFormatter(),
  })
  NODE_ENV: IEnvironment;

  @IsNumber(
    { allowInfinity: false, allowNaN: false, maxDecimalPlaces: 0 },
    { message: createErrorMessageFormatter('Debe ser un número.') },
  )
  @IsPositive({
    message: createErrorMessageFormatter('Debe ser un número positivo.'),
  })
  PORT: number;
}

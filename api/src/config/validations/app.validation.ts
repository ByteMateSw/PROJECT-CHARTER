import {
  IsDefined,
  IsEnum,
  IsNumber,
  IsPositive,
  IsUrl,
} from 'class-validator';
import { IEnvironment } from '../interfaces/app.interface';
import {
  createEnumErrorMessageFormatter,
  createErrorMessageFormatter,
} from 'src/utils/validation/validate-util';

export class AppEnvironmentVariables {
  @IsDefined({
    message: createErrorMessageFormatter(
      'Se requiere el entorno en el que se ejecuta la aplicación.',
    ),
  })
  @IsEnum(IEnvironment, {
    message: createEnumErrorMessageFormatter(),
  })
  NODE_ENV: IEnvironment;

  @IsDefined({
    message: createErrorMessageFormatter(
      'Se requiere el puerto de la aplicación.',
    ),
  })
  @IsNumber(
    { allowInfinity: false, allowNaN: false, maxDecimalPlaces: 0 },
    { message: createErrorMessageFormatter('Debe ser un número.') },
  )
  @IsPositive({
    message: createErrorMessageFormatter('Debe ser un número positivo.'),
  })
  PORT: number;
}

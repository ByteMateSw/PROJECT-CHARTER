import {
  IsDefined,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  IsUrl,
  Max,
} from 'class-validator';
import { createErrorMessageFormatter } from '../../utils/validation/validate-util';

export class DatabaseTestEnvironmentVariables {
  @IsDefined({
    message: createErrorMessageFormatter(
      'Se requiere la dirección URL de la base de datos.',
    ),
  })
  @IsUrl(
    {
      require_port: false,
      require_tld: false,
      require_valid_protocol: false,
    },
    {
      message: createErrorMessageFormatter('Debe ser una URL'),
    },
  )
  TEST_DATABASE_HOST: string;

  @IsDefined({
    message: createErrorMessageFormatter(
      'Se requiere el nombre de la base de datos.',
    ),
  })
  @IsString({
    message: createErrorMessageFormatter('Debe ser un string.'),
  })
  TEST_DATABASE_NAME: string;

  @IsDefined({
    message: createErrorMessageFormatter(
      'Se requiere un usuario para conectarse a la base de datos.',
    ),
  })
  @IsString({
    message: createErrorMessageFormatter('Debe ser un string.'),
  })
  TEST_DATABASE_USER: string;

  @IsDefined({
    message: createErrorMessageFormatter(
      'Se requiere la contraseña del usuario para conectarse a la base de datos.',
    ),
  })
  @IsString({
    message: createErrorMessageFormatter('Debe ser un string'),
  })
  TEST_DATABASE_PASSWORD: string;

  @IsNumber(
    { allowInfinity: false, allowNaN: false, maxDecimalPlaces: 0 },
    { message: createErrorMessageFormatter('Debe ser un número.') },
  )
  @IsPositive({
    message: createErrorMessageFormatter('Debe ser un número positivo.'),
  })
  @IsOptional()
  @Max(65535, {
    message: createErrorMessageFormatter(
      'Debe ser un número menor a 65535 (El máximo de puertos permitidos).',
    ),
  })
  DATABASE_PORT: number;
}

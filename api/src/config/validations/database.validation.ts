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

/**
 * Represents the environment variables required for the database connection.
 */
export class DatabaseEnvironmentVariables {
  /**
   * The URL of the database.
   * @remarks
   * The URL must be a valid URL.
   * It must not require a port, a top-level domain, or a valid protocol.
   * @example postgres://domain.com:5432
   */
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
  DATABASE_HOST: string;

  /**
   * The name of the database.
   * @remarks
   * The name must be a string.
   * It must not be empty.
   * @example my_database
   */
  @IsDefined({
    message: createErrorMessageFormatter(
      'Se requiere el nombre de la base de datos.',
    ),
  })
  @IsString({
    message: createErrorMessageFormatter('Debe ser un string.'),
  })
  DATABASE_NAME: string;

  /**
   * The user to connect to the database.
   * @remarks
   * The user must be a string.
   * It must not be empty.
   * @example my_user
   */
  @IsDefined({
    message: createErrorMessageFormatter(
      'Se requiere un usuario para conectarse a la base de datos.',
    ),
  })
  @IsString({
    message: createErrorMessageFormatter('Debe ser un string.'),
  })
  DATABASE_USER: string;

  /**
   * The password of the user to connect to the database.
   * @remarks
   * The password must be a string.
   * It must not be empty.
   * @example my_password
   */
  @IsDefined({
    message: createErrorMessageFormatter(
      'Se requiere la contraseña del usuario para conectarse a la base de datos.',
    ),
  })
  @IsString({
    message: createErrorMessageFormatter('Debe ser un string'),
  })
  DATABASE_PASSWORD: string;

  /**
   * The port on which the database is running.
   * @remarks
   * The port must be a positive number.
   * It not allowed to be infinity or NaN.
   * It must be less than 65535, the maximum number of ports allowed.
   * @example 5432
   * @default 5432
   */
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

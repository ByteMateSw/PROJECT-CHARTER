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
} from '../../utils/validation/validate-util';

/**
 * Represents the environment variables required for the application.
 */
export class AppEnvironmentVariables {
  /** The environment in which the application is running.
   * @remarks
   * The environment can be one of the following:
   * - development
   * - production
   * - test
   */
  @IsDefined({
    message: createErrorMessageFormatter(
      'Se requiere el entorno en el que se ejecuta la aplicación.',
    ),
  })
  @IsEnum(IEnvironment, {
    message: createEnumErrorMessageFormatter(),
  })
  NODE_ENV: IEnvironment;

  /**
   * The port on which the application will run.
   * @remarks
   * The port must be a positive number.
   * It not allowed to be infinity or NaN.
   * @example 3000
   */
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

  /**
   * The origin of the API calls for CORS configuration.
   * @remarks
   * The origin must be a valid URL.
   * It must not require a port, a top-level domain, or a valid protocol.
   * @example http://domain.com:3000
   */
  @IsDefined({
    message: createErrorMessageFormatter(
      'Se requiere el origen de las llamadas a la API para la configuración de CORS.',
    ),
  })
  // @IsUrl(
  //   {
  //     require_port: false,
  //     require_tld: false,
  //     require_valid_protocol: false,
  //   },
  //   {
  //     message: createErrorMessageFormatter('Debe ser una URL'),
  //   },
  // )
  ORIGIN: string;
}

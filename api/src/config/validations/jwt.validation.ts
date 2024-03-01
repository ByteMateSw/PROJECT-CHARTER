import {
  IsBoolean,
  IsDefined,
  IsEnum,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';
import { ISamesite } from '../interfaces/jwt.interface';
import {
  createEnumErrorMessageFormatter,
  createErrorMessageFormatter,
} from '../../utils/validation/validate-util';

/**
 * Represents the environment variables required for the JWT configuration.
 */
export class JWTEnvironmentVariables {
  /**
   * The secret key to encode the JWT access token.
   * @remarks
   * The secret key must be a string.
   */
  @IsDefined({
    message: createErrorMessageFormatter(
      'Se requiere la clave secreta para codificar el token JWT de acceso.',
    ),
  })
  @IsString({
    message: createErrorMessageFormatter('Debe ser un string.'),
  })
  JWT_ACCESS_SECRET_KEY: string;

  /**
   * The expiration time of the JWT access token in seconds.
   * @remarks
   * The expiration time must be a positive number.
   * It not allowed to be infinity or NaN.
   * @example 3600 (1 hour)
   */
  @IsDefined({
    message: createErrorMessageFormatter(
      'Se requiere el tiempo de expiración del token JWT de acceso.',
    ),
  })
  @IsNumber(
    { allowInfinity: false, allowNaN: false, maxDecimalPlaces: 0 },
    { message: createErrorMessageFormatter('Debe ser un número.') },
  )
  @IsPositive({
    message: createErrorMessageFormatter('Debe ser un número positivo.'),
  })
  EXPIRATION_TIME_ACCESS_TOKEN: number;

  /**
   * The secret key to encode the JWT refresh token.
   * @remarks
   * The secret key must be a string.
   */
  @IsDefined({
    message: createErrorMessageFormatter(
      'Se requiere la clave secreta para codificar el token JWT de renovación.',
    ),
  })
  @IsString({
    message: createErrorMessageFormatter('Debe ser un string.'),
  })
  JWT_REFRESH_SECRET_KEY: string;

  /**
   * The expiration time of the JWT refresh token in seconds.
   * @remarks
   * The expiration time must be a positive number.
   * It not allowed to be infinity or NaN.
   * @example 3600 (1 hour)
   */
  @IsDefined({
    message: createErrorMessageFormatter(
      'Se requiere el tiempo de expiración del token JWT de renovación.',
    ),
  })
  @IsNumber(
    { allowInfinity: false, allowNaN: false, maxDecimalPlaces: 0 },
    { message: createErrorMessageFormatter('Debe ser un número.') },
  )
  @IsPositive({
    message: createErrorMessageFormatter('Debe ser un número positivo.'),
  })
  EXPIRATION_TIME_REFRESH_TOKEN: number;

  /**
   * The secret key to encode the account verification token.
   * @remarks
   * The secret key must be a string.
   */
  @IsDefined({
    message: createErrorMessageFormatter(
      'Se requiere la clave secreta para codificar el token de verificación de la cuenta.',
    ),
  })
  @IsString({
    message: createErrorMessageFormatter('Debe ser un string.'),
  })
  JWT_VERIFY_SECRET_KEY: string;

  /**
   * The expiration time of the JWT account verification token in seconds.
   * @remarks
   * The expiration time must be a positive number.
   * It not allowed to be infinity or NaN.
   * @example 3600 (1 hour)
   */
  @IsDefined({
    message: createErrorMessageFormatter(
      'Se requiere el tiempo de expiración del token de verificación de la cuenta.',
    ),
  })
  @IsNumber(
    { allowInfinity: false, allowNaN: false, maxDecimalPlaces: 0 },
    { message: createErrorMessageFormatter('Debe ser un número.') },
  )
  @IsPositive({
    message: createErrorMessageFormatter('Debe ser un número positivo.'),
  })
  EXPIRATION_TIME_VERIFY_TOKEN: number;

  /**
   * The secure attribute of the refresh token cookie.
   * @remarks
   * The secure attribute must be a boolean.
   */
  @IsBoolean({
    message: createErrorMessageFormatter('Debe ser un valor booleano.'),
  })
  @IsOptional()
  SECURE: boolean;

  /**
   * The maximum age of the refresh token cookie in milliseconds.
   * @remarks
   * The maximum age must be a positive number.
   * It not allowed to be infinity or NaN.
   * @example 3600000
   */
  @IsNumber(
    { allowInfinity: false, allowNaN: false, maxDecimalPlaces: 0 },
    { message: createErrorMessageFormatter('Debe ser un número.') },
  )
  @IsPositive({
    message: createErrorMessageFormatter('Debe ser un número positivo.'),
  })
  @IsOptional()
  MAX_AGE: number;

  /**
   * The SameSite attribute of the refresh cookie.
   * @remarks
   * The SameSite attribute must be one of the following:
   * - 'Strict': The cookie is sent only to the same site as the request.
   * - 'Lax': The cookie is sent to the same site as the request and to the top-level navigation.
   * - 'None': The cookie is sent to any site.
   * @example 'Lax'
   */
  @IsEnum(ISamesite, {
    message: createEnumErrorMessageFormatter(),
  })
  SAMESITE: ISamesite;
}

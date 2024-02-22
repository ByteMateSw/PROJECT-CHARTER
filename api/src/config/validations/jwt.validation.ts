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
} from 'src/utils/validation/validate-util';

export class JWTEnvironmentVariables {
  @IsDefined({
    message: createErrorMessageFormatter(
      'Se requiere la clave secreta para codificar el token JWT de acceso.',
    ),
  })
  @IsString({
    message: createErrorMessageFormatter('Debe ser un string.'),
  })
  JWT_ACCESS_SECRET_KEY: string;

  @IsDefined({
    message: createErrorMessageFormatter(
      'Se requiere el tiempo de expiración del token JWT de acceso.',
    ),
  })
  @IsString({
    message: createErrorMessageFormatter('Debe ser un string.'),
  })
  EXPIRATION_TIME_ACCESS_TOKEN: string;

  @IsDefined({
    message: createErrorMessageFormatter(
      'Se requiere la clave secreta para codificar el token JWT de renovación.',
    ),
  })
  @IsString({
    message: createErrorMessageFormatter('Debe ser un string.'),
  })
  JWT_REFRESH_SECRET_KEY: string;

  @IsDefined({
    message: createErrorMessageFormatter(
      'Se requiere el tiempo de expiración del token JWT de renovación.',
    ),
  })
  @IsString({
    message: createErrorMessageFormatter('Debe ser un string.'),
  })
  EXPIRATION_TIME_REFRESH_TOKEN: string;

  @IsBoolean({
    message: createErrorMessageFormatter('Debe ser un valor booleano.'),
  })
  @IsOptional()
  SECURE: boolean;

  @IsNumber(
    { allowInfinity: false, allowNaN: false, maxDecimalPlaces: 0 },
    { message: createErrorMessageFormatter('Debe ser un número.') },
  )
  @IsPositive({
    message: createErrorMessageFormatter('Debe ser un número positivo.'),
  })
  @IsOptional()
  MAX_AGE: number;

  @IsEnum(ISamesite, {
    message: createEnumErrorMessageFormatter(),
  })
  SAMESITE: ISamesite;
}

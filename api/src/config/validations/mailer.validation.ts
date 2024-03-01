import {
  IsDefined,
  IsEmail,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  IsUrl,
  Max,
} from 'class-validator';
import { createErrorMessageFormatter } from 'src/utils/validation/validate-util';

export class MailerEnvironmentVariables {
  @IsDefined({
    message: createErrorMessageFormatter(
      'Se requiere la dirección URL del SMTP.',
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
  EMAIL_HOST: string;

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
  EMAIL_PORT: number;

  @IsDefined({
    message: createErrorMessageFormatter(
      'Se requiere la contraseña del usuario para conectarse al SMTP.',
    ),
  })
  @IsString({
    message: createErrorMessageFormatter('Debe ser un string'),
  })
  EMAIL_USER: string;

  @IsDefined({
    message: createErrorMessageFormatter(
      'Se requiere la contraseña del usuario para conectarse al SMTP.',
    ),
  })
  @IsString({
    message: createErrorMessageFormatter('Debe ser un string'),
  })
  EMAIL_PASSWORD: string;

  @IsDefined({
    message: createErrorMessageFormatter(
      'Se requiere la dirección URL del mensaje de verificación.',
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
  EMAIL_URL_MESSAGE: string;

  @IsDefined({
    message: createErrorMessageFormatter(
      'Se requiere el correo emisor del mensaje.',
    ),
  })
  @IsString({
    message: createErrorMessageFormatter('Debe ser un string'),
  })
  @IsEmail({}, { message: createErrorMessageFormatter('Debe de ser un email') })
  EMAIL_FROM: string;
}

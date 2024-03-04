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

/**
 * Represents the environment variables required for mailer configuration.
 */
export class MailerEnvironmentVariables {
  /**
   * The URL of the SMTP server.
   * @remarks
   * The URL must be a valid URL.
   * It must not require a port, a top-level domain, or a valid protocol.
   * @example smtp://domain.com
   */
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

  /**
   * The port number of the SMTP server.
   * @remarks
   * The port number must be a positive number.
   * It not allowed to be infinity or NaN.
   * It must be less than 65535 (The maximum number of ports allowed).
   * @example 587
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
  EMAIL_PORT: number;

  /**
   * The username for connecting to the SMTP server.
   * @remarks
   * The username must be a string.
   */
  @IsDefined({
    message: createErrorMessageFormatter(
      'Se requiere la contraseña del usuario para conectarse al SMTP.',
    ),
  })
  @IsString({
    message: createErrorMessageFormatter('Debe ser un string'),
  })
  EMAIL_USER: string;

  /**
   * The password for connecting to the SMTP server.
   * @remarks
   * The password must be a string.
   */
  @IsDefined({
    message: createErrorMessageFormatter(
      'Se requiere la contraseña del usuario para conectarse al SMTP.',
    ),
  })
  @IsString({
    message: createErrorMessageFormatter('Debe ser un string'),
  })
  EMAIL_PASSWORD: string;

  /**
   * The URL of the verification message.
   * @remarks
   * The URL must be a valid URL.
   * It must not require a port, a top-level domain, or a valid protocol.
   * @example http://domain.com/
   */
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

  /**
   * The email address of the sender.
   * @remarks
   * The email address must be a valid email.
   * @example example@domain.com
   */
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

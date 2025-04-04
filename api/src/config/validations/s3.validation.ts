import { IsDefined, IsUrl } from 'class-validator';
import { createErrorMessageFormatter } from 'src/utils/validation/validate-util';

export class S3EnvironmentVariables {
  @IsDefined({
    message: createErrorMessageFormatter(
      'Se requiere el ID de la cuenta de R2 de cloudflare.',
    ),
  })
  R2_CLIENT_ID: string;

  @IsDefined({
    message: createErrorMessageFormatter(
      'Se requiere el token de acceso para el acceso al bucket de R2.',
    ),
  })
  R2_ACCESS_KEY_ID: string;

  @IsDefined({
    message: createErrorMessageFormatter(
      'Se requiere la clave secreta de acceso al bucket de R2.',
    ),
  })
  R2_SECRET_ACCESS_KEY: string;

  @IsDefined({
    message: createErrorMessageFormatter(
      'Se requiere el nombre del bucket de R2.',
    ),
  })
  R2_BUCKET_NAME: string;

  @IsDefined({
    message: createErrorMessageFormatter(
      'Se requiere el nombre del dominio usado en el bucket de R2.',
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
  R2_PUBLIC_DOMAIN: string;
}

import { registerAs } from '@nestjs/config';
import 'dotenv/config';
import { S3EnvironmentVariables } from './validations/s3.validation';
import { IS3Config } from './interfaces/s3.interface';
import { validateUtil } from '../utils/validation/validate-util';

/**
 * Registers the S3 bucket configuration as a NestJS configuration provider.
 * @returns The S3 bucket configuration object.
 */
export default registerAs('s3', (): IS3Config => {
  validateUtil(process.env, S3EnvironmentVariables);

  return {
    client_id: process.env.R2_CLIENT_ID,
    access_key_id: process.env.R2_ACCESS_KEY_ID,
    secret_access_key: process.env.R2_SECRET_ACCESS_KEY,
    bucket_name: process.env.R2_BUCKET_NAME,
    domain: process.env.R2_PUBLIC_DOMAIN,
  };
});

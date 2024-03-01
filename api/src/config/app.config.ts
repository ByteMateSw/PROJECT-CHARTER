import { registerAs } from '@nestjs/config';
import 'dotenv/config';
import { AppEnvironmentVariables } from './validations/app.validation';
import { IAppConfig, IEnvironment } from './interfaces/app.interface';
import { validateUtil } from '../utils/validation/validate-util';

/**
 * Registers the application configuration as a NestJS configuration provider.
 * @returns {IAppConfig} The application configuration object.
 */
export default registerAs('app', (): IAppConfig => {
  validateUtil(process.env, AppEnvironmentVariables);

  return {
    nodeEnv: process.env.NODE_ENV as IEnvironment,
    port: parseInt(process.env.PORT),
    origin: process.env.ORIGIN,
  };
});

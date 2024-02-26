import { registerAs } from '@nestjs/config';
import 'dotenv/config';
import {
  DatabaseNamespaces,
  IDatabaseConfig,
} from './interfaces/database.interface';
import { validateUtil } from '../utils/validation/validate-util';
import { DatabaseTestEnvironmentVariables } from './validations/database.test.validation';
import { IEnvironment } from './interfaces/app.interface';

export default registerAs(
  DatabaseNamespaces.Test,
  (): IDatabaseConfig | undefined => {
    if (process.env.NODE_ENV !== IEnvironment.Test) return undefined;

    validateUtil(process.env, DatabaseTestEnvironmentVariables);

    return {
      host: process.env.TEST_DATABASE_HOST,
      name: process.env.TEST_DATABASE_NAME,
      user: process.env.TEST_DATABASE_USER,
      pass: process.env.TEST_DATABASE_PASSWORD,
      port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
    };
  },
);

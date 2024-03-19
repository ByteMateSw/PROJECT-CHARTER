import { registerAs } from '@nestjs/config';
import 'dotenv/config';
import {
  DatabaseNamespaces,
  IDatabaseConfig,
} from './interfaces/database.interface';
import { validateUtil } from '../utils/validation/validate-util';
import { DatabaseTestEnvironmentVariables } from './validations/database.test.validation';
import { IEnvironment } from './interfaces/app.interface';

/**
 * Registers the test database configuration as a NestJS configuration provider.
 * @returns {IDatabaseConfig} The test database configuration object.
 */
export default registerAs(
  DatabaseNamespaces.Test,
  (): IDatabaseConfig | undefined => {
    if (process.env.NODE_ENV !== IEnvironment.Test) return undefined;

    validateUtil(process.env, DatabaseTestEnvironmentVariables);

    return {
      type: 'postgres',
      host: process.env.TEST_DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
      database: process.env.TEST_DATABASE_NAME,
      username: process.env.TEST_DATABASE_USER,
      password: process.env.TEST_DATABASE_PASSWORD,
      synchronize: true,
      entities: [__dirname + '/../**/*entity{.js,.ts}'],
      logging: true,
      migrations: [__dirname + '/../**/migrations/*{.js,.ts}'],
      migrationsTableName: 'migrations',
    };
  },
);

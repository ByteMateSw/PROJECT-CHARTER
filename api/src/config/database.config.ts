import { registerAs } from '@nestjs/config';
import 'dotenv/config';
import {
  DatabaseNamespaces,
  IDatabaseConfig,
} from './interfaces/database.interface';
import { validateUtil } from '../utils/validation/validate-util';
import { DatabaseEnvironmentVariables } from './validations/database.validation';
import { IEnvironment } from './interfaces/app.interface';

/**
 * Registers the database configuration as a NestJS configuration provider.
 * @returns {IDatabaseConfig} The database configuration object.
 */
export default registerAs(
  DatabaseNamespaces.Production,
  (): IDatabaseConfig => {
    validateUtil(process.env, DatabaseEnvironmentVariables);

    return {
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
      database: process.env.DATABASE_NAME,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      synchronize: process.env.NODE_ENV !== IEnvironment.Production,
      entities: [__dirname + '/../**/*entity{.js,.ts}'],
      logging: process.env.NODE_ENV !== IEnvironment.Development,
      migrations: [__dirname + '/../**/migrations/*{.js,.ts}'],
      migrationsTableName: 'migrations',
    };
  },
);

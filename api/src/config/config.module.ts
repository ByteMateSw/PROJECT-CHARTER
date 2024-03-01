import { ConfigModule } from '@nestjs/config';
import databaseConfig from './database.config';
import jwtConfig from './jwt.config';
import appConfig from './app.config';
import { IEnvironment } from './interfaces/app.interface';
import 'dotenv/config';
import databaseTestConfig from './database.test.config';
import mailerConfig from './mailer.config';

/**
 * The database configuration based on the current environment.
 * If the environment is set to 'Test', it uses the test database configuration.
 * Otherwise, it uses the default database configuration.
 */
const dbConfig =
  process.env.NODE_ENV === IEnvironment.Test
    ? databaseTestConfig
    : databaseConfig;

/**
 * Configuration module for the application.
 * Loads the specified configuration files and sets up global configuration.
 */
export const ConfigurationModule = ConfigModule.forRoot({
  load: [appConfig, jwtConfig, dbConfig, mailerConfig],
  cache: process.env.NODE_ENV === IEnvironment.Production,
  isGlobal: true,
});

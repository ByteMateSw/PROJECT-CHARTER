import { ConfigModule } from '@nestjs/config';
import databaseConfig from './database.config';
import jwtConfig from './jwt.config';
import appConfig from './app.config';
import { IEnvironment } from './interfaces/app.interface';
import 'dotenv/config';
import databaseTestConfig from './database.test.config';

const dbConfig =
  process.env.NODE_ENV === IEnvironment.Test
    ? databaseTestConfig
    : databaseConfig;

export const ConfigurationModule = ConfigModule.forRoot({
  load: [appConfig, jwtConfig, dbConfig],
  cache: process.env.NODE_ENV === IEnvironment.Production,
  isGlobal: true,
});

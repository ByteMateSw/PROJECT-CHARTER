import { registerAs } from '@nestjs/config';
import 'dotenv/config';
import { IDatabaseConfig } from './interfaces/database.interface';
import { validateUtil } from 'src/utils/validation/validate-util';
import { DatabaseEnvironmentVariables } from './validations/database.validation';

export default registerAs('database', (): IDatabaseConfig => {
  validateUtil(process.env, DatabaseEnvironmentVariables);

  return {
    host: process.env.DATABASE_HOST,
    name: process.env.DATABASE_NAME,
    user: process.env.DATABASE_USER,
    pass: process.env.DATABASE_PASSWORD,
    port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
  };
});

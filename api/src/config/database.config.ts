import { registerAs } from '@nestjs/config';
import 'dotenv/config';

export default registerAs('database', () => ({
  host: process.env.DATABASE_HOST,
  name: process.env.DATABASE_NAME,
  user: process.env.DATABASE_USER,
  pass: process.env.DATABASE_PASSWORD,
  port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
}));

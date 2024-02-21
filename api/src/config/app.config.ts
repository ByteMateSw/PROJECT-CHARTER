import { registerAs } from '@nestjs/config';
import 'dotenv/config';

export default registerAs('app', () => ({
  port: parseInt(process.env.PORT, 10) || 3002,
  env: process.env.NODE_ENV,
  origin: process.env.FRONTEND_URL,
}));

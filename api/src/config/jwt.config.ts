import { registerAs } from '@nestjs/config';
import 'dotenv/config';

export default registerAs('jwt', () => ({
  access_secret: process.env.JWT_ACCESS_SECRET_KEY,
  access_expiration: process.env.EXPIRATION_TIME_ACCESS_TOKEN,
  refresh_secret: process.env.JWT_REFRESH_SECRET_KEY,
  refresh_expiration: process.env.EXPIRATION_TIME_REFRESH_TOKEN,
  secure: process.env.NODE_ENV !== 'development',
  maxAge: process.env.MAX_AGE || 0,
  samesite: process.env.SAMESITE || 'lax',
}));

const cookiePrefix = '__Secure-';
const cookieName = 'auth_cookie';
export const refreshCookieName: string =
  process.env.NODE_ENV === 'development'
    ? cookieName
    : cookiePrefix + cookieName;

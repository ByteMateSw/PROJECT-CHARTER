import { registerAs } from '@nestjs/config';
import 'dotenv/config';
import {
  CookiePrefix,
  IJWTConfig,
  ISamesite,
} from './interfaces/jwt.interface';
import { validateUtil } from '../utils/validation/validate-util';
import { JWTEnvironmentVariables } from './validations/jwt.validation';

/**
 * Registers the jwt configuration as a NestJS configuration provider.
 * @returns {IJWTConfig} The jwt configuration object.
 */
export default registerAs('jwt', (): IJWTConfig => {
  validateUtil(process.env, JWTEnvironmentVariables);

  return {
    access_secret: process.env.JWT_ACCESS_SECRET_KEY,
    access_expiration: process.env.EXPIRATION_TIME_ACCESS_TOKEN,
    refresh_secret: process.env.JWT_REFRESH_SECRET_KEY,
    refresh_expiration: process.env.EXPIRATION_TIME_REFRESH_TOKEN,
    verify_secret: process.env.JWT_VERIFY_SECRET_KEY,
    verify_expiration: process.env.EXPIRATION_TIME_VERIFY_TOKEN,
    secure: process.env.NODE_ENV !== 'development',
    maxAge: parseInt(process.env.MAX_AGE) || 0,
    samesite: (process.env.SAMESITE as ISamesite) || ISamesite.Lax,
  };
});

const cookieName = 'auth_cookie';
/**
 * The name of the refresh cookie.
 * If the environment is 'development', the cookie name is the same as `cookieName`.
 * Otherwise, the cookie name is prefixed with `CookiePrefix.Secure` enumeration.
 */
export const refreshCookieName: string =
  process.env.NODE_ENV === 'development'
    ? cookieName
    : CookiePrefix.Secure + cookieName;

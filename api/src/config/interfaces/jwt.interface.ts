/**
 * Enum representing the SameSite attribute values for cookies.
 */
export enum ISamesite {
  None = 'none',
  Lax = 'lax',
  Strict = 'strict',
}

/**
 * Interface representing the JWT configuration.
 */
export interface IJWTConfig {
  access_secret: string;
  access_expiration: string;
  refresh_secret: string;
  refresh_expiration: string;
  verify_secret: string;
  verify_expiration: string;
  secure: boolean;
  maxAge: number;
  samesite: ISamesite;
}

export enum CookiePrefix {
  Host = '__Host-',
  Secure = '__Secure-',
}

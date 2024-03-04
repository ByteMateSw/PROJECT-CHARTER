/**
 * Represents the tokens used for authentication.
 * @property access_token - The access token.
 * @property refresh_token - The refresh token.
 */
export type Tokens = { access_token: string; refresh_token: string };

/**
 * Represents an returned access token.
 */
export type AccessToken = { access_token: string };

/**
 * Represents the payload of a JWT token.
 * @property sub - The subject of the token.
 * @property email - The email associated with the token.
 * @property role - The role assigned to the token.
 */
export type Payload = { sub: number; email: string; role: string };

/**
 * Represents the structure of a verify token.
 * @property email - The email associated with the token.
 * @property iat - The time the token was issued.
 * @property exp - The time the token will expire.
 */
export type VerifyToken = { email: string; iat: number; exp: number };

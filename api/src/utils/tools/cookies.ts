import { CookieOptions, Request, Response } from 'express';

/**
 * Checks if a cookie with the specified name exists in the request object.
 * @param cookieName - The name of the cookie to check.
 * @param req - The request object.
 * @returns A boolean value indicating whether the cookie exists.
 */
export function existsCookie(cookieName: string, req: Request): boolean {
  return (
    req.cookies &&
    cookieName in req.cookies &&
    req.cookies[cookieName].length > 0
  );
}

/**
 * Sets a cookie with the specified name, value, and options.
 * @param cookieName - The name of the cookie.
 * @param value - The value of the cookie.
 * @param res - The response object.
 * @param options - The options for the cookie (optional).
 */
export function setCookie(
  cookieName: string,
  value: string,
  res: Response,
  options: CookieOptions = {},
) {
  res.cookie(cookieName, value, options);
}

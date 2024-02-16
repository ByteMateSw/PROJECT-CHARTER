import { CookieOptions, Request, Response } from 'express';

export function existsCookie(cookieName: string, req: Request) {
  return (
    req.cookies &&
    cookieName in req.cookies &&
    req.cookies[cookieName].length > 0
  );
}

export function setCookie(
  cookieName: string,
  value: string,
  res: Response,
  options: CookieOptions = {},
) {
  res.cookie(cookieName, value, options);
}

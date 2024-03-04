import {
  createParamDecorator,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { refreshCookieName } from '../../config/jwt.config';
import { existsCookie } from '../../utils/tools/cookies';

/**
 * Custom parameter decorator that retrieves the refresh token from a cookie with the name in refreshCookieName variable.
 * @param data - The data passed to the decorator (ignored)
 * @param ctx - The execution context.
 * @returns The value of the refresh token cookie.
 * @throws ForbiddenException if the refresh token cookie does not exist.
 */
export const RefreshTokenCookie = createParamDecorator(
  (_: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    if (!existsCookie(refreshCookieName, request))
      throw new ForbiddenException('Access Denied');
    return request.cookies[refreshCookieName];
  },
);

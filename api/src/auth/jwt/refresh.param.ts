import {
  createParamDecorator,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { refreshCookieName } from '../../config/jwt.config';
import { existsCookie } from '../../utils/tools/cookies';

export const RefreshTokenCookie = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    if (!existsCookie(refreshCookieName, request))
      throw new ForbiddenException('Access Denied');
    return request.cookies[refreshCookieName];
  },
);

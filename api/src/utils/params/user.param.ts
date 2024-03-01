import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { CustomParseIntPipe } from '../pipes/parse-int.pipe';

export const UserParam = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);

export const UserParamID = createParamDecorator(
  (data: string, ctx: ExecutionContext): number | undefined => {
    const request = ctx.switchToHttp().getRequest();
    if (!request.user) return undefined;
    return request.user.id;
  },
);

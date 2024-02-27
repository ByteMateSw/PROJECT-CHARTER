import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const InfoParam = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    if (!request.body.info) return undefined;
    return JSON.parse(request.body.info);
  },
);

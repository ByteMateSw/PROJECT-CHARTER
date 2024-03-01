import { ExecutionContext, createParamDecorator } from '@nestjs/common';

/**
 * Custom parameter decorator that extracts and parses the "info" property from the request body.
 * If the "info" property is not present or cannot be parsed, it returns undefined.
 * Used to pass information data when is send with files in the request.
 * @param _ - The data passed to the decorator (ignored)
 * @param ctx - The execution context
 * @returns The parsed "info" property or undefined
 */
export const InfoParam = createParamDecorator(
  (_: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    if (!request.body.info) return undefined;
    return JSON.parse(request.body.info);
  },
);

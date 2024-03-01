import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserParam as UserParamType } from '../types/functions.type';

/**
 * Custom parameter decorator that retrieves the user object from the request.
 * @param _ - Additional data for the decorator (ignored).
 * @param ctx - The execution context containing the request object.
 * @returns The user object from the request.
 */
export const UserParam = createParamDecorator(
  (_: string, ctx: ExecutionContext): UserParamType => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);

/**
 * Custom parameter decorator that extracts the ID of the authenticated user from the request object.
 * @param _ - Additional data for the decorator (ignored).
 * @param ctx - The execution context containing the request object.
 * @returns The ID of the authenticated user, or undefined if the user is not authenticated.
 */
export const UserParamID = createParamDecorator(
  (_: string, ctx: ExecutionContext): number | undefined => {
    const request = ctx.switchToHttp().getRequest();
    if (!request.user) return undefined;
    return request.user.id;
  },
);

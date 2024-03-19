import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './role.decorator';
import { Role } from './role.entity';

/**
 * RoleGuard class that implements the CanActivate interface.
 * This guard is responsible for checking if the user has the required roles to access a specific route.
 */
@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  /**
   * Method that determines if the user has the required roles to access the route.
   * @param context - The execution context of the route.
   * @returns A boolean indicating if the user has the required roles.
   * @throws UnauthorizedException if the user does not have the required roles.
   */
  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) return true;

    const request = context.switchToHttp().getRequest();
    if (!request.user) return false;
    const roles = request.user.role;

    const hasRole = requiredRoles.some(role => role === roles);
    if (!hasRole) throw new UnauthorizedException();

    return true;
  }
}

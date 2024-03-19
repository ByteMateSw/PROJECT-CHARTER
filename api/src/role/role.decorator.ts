import { SetMetadata, UseGuards } from '@nestjs/common';
import { Role } from '../utils/enums/role.enum';
import { applyDecorators } from '@nestjs/common';
import { AccessTokenGuard } from '../auth/jwt/access.guard';
import { RoleGuard } from './role.guard';

/**
 * The key used to define roles for authorization.
 */
export const ROLES_KEY = 'roles';

/**
 * Decorator function that sets the metadata for the allowed roles and applies guards to the endpoint.
 * @param roles The roles allowed to access the endpoint.
 * @returns A decorator function that sets the metadata and applies guards.
 */
export const Roles = (...roles: Role[]) => {
  return applyDecorators(
    SetMetadata(ROLES_KEY, roles),
    UseGuards(AccessTokenGuard, RoleGuard),
  );
};

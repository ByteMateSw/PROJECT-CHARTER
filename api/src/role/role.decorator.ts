import { SetMetadata, UseGuards } from '@nestjs/common';
import { Role } from '../utils/enums/role.enum';
import { applyDecorators } from '@nestjs/common';
import { AccessTokenGuard } from 'src/auth/jwt/access.guard';
import { RoleGuard } from './role.guard';

export const ROLES_KEY = 'roles';

export const Roles = (...roles: Role[]) => {
  return applyDecorators(
    SetMetadata(ROLES_KEY, roles),
    UseGuards(AccessTokenGuard, RoleGuard),
  );
};

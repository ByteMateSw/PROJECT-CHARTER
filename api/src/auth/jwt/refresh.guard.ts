import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

/**
 * Guard that checks if a refresh token is valid.
 */
@Injectable()
export class RefreshTokenGuard extends AuthGuard('jwt-refresh') {}

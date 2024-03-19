import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

/**
 * Guard that checks the validity of an access token using JWT authentication.
 */
@Injectable()
export class AccessTokenGuard extends AuthGuard('jwt') {}

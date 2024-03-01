import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

/**
 * Guard that implements local authentication strategy.
 */
@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {}

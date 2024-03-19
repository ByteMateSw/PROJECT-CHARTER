import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { refreshCookieName } from '../../config/jwt.config';
import { existsCookie } from '../../utils/tools/cookies';

/**
 * Strategy for validating and extracting refresh tokens from JWT.
 */
@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  private static cookieName: string = refreshCookieName;

  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        RefreshTokenStrategy.extractJWT,
      ]),
      ignoreExpiration: false,
      secretOrKey: configService.get('jwt.refresh_secret'),
    });
  }

  /**
   * Validates the payload of the JWT and returns the extracted user information.
   * @param payload - The payload of the JWT.
   * @returns An object containing the user information extracted from the JWT payload.
   */
  async validate(payload: any) {
    return { id: payload.sub, email: payload.email, role: payload.role };
  }

  private static extractJWT(req: Request) {
    if (existsCookie(RefreshTokenStrategy.cookieName, req)) {
      return req.cookies[RefreshTokenStrategy.cookieName];
    }
    return null;
  }
}

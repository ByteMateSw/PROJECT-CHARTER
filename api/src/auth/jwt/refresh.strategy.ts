import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { refreshCookieName } from '../../config/jwt.config';
import { existsCookie } from '../../utils/tools/cookies';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  private static cookieName: string = refreshCookieName;

  constructor(private configService: ConfigService) {
    console.log(configService.get('jwt.refresh_secret'));
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        RefreshTokenStrategy.extractJWT,
      ]),
      ignoreExpiration: false,
      secretOrKey: configService.get('jwt.refresh_secret'),
    });
  }

  async validate(payload: any) {
    //console.log('Payload', payload);
    return { id: payload.sub, email: payload.email, role: payload.role };
  }

  private static extractJWT(req: Request) {
    if (existsCookie(RefreshTokenStrategy.cookieName, req)) {
      return req.cookies[RefreshTokenStrategy.cookieName];
    }
    return null;
  }
}

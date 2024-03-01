import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

/**
 * Strategy for validating and extracting access tokens from JWT in the request header.
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('jwt.access_secret'),
    });
  }

  /**
   * Validates the payload of the JWT token.
   * @param payload - The payload of the JWT token.
   * @returns An object containing the validated properties from the payload.
   */
  async validate(payload: any) {
    return { id: payload.sub, email: payload.email, role: payload.role };
  }
}

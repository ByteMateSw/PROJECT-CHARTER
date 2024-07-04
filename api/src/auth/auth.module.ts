import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../user/user.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt/access.strategy';
import { HashService } from './hash.service';
import { ConfigModule } from '@nestjs/config';
import { LocalStrategy } from './local/local.strategy';
import { PassportModule } from '@nestjs/passport';
import { RefreshTokenStrategy } from './jwt/refresh.strategy';
import { MailModule } from '../mailer/mailer.module';
import { GoogleAuthStrategy } from './google/google.strategy';

/**
 * Module responsible for authentication-related functionality.
 */
@Module({
  imports: [
    ConfigModule,
    PassportModule,
    UserModule,
    JwtModule.register({}),
    MailModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    HashService,
    JwtStrategy,
    RefreshTokenStrategy,
    LocalStrategy,
    GoogleAuthStrategy,
  ],
  exports: [AuthService],
})
export class AuthModule {}

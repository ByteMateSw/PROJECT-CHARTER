import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../user/user.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt/access.strategy';
import { HashService } from './hash.service';
import { ToSController } from './ToS/ToS.controller';
import { ConfigModule } from '@nestjs/config';
import { LocalStrategy } from './local/local.strategy';
import { PassportModule } from '@nestjs/passport';
import { RefreshTokenStrategy } from './jwt/refresh.strategy';
import { MailerModule } from '../mailer/mailer.module';

@Module({
  imports: [
    ConfigModule,
    PassportModule,
    UserModule,
    JwtModule.register({}),
    MailerModule,
  ],
  controllers: [AuthController, ToSController],
  providers: [
    AuthService,
    HashService,
    JwtStrategy,
    RefreshTokenStrategy,
    LocalStrategy,
  ],
  exports: [AuthService],
})
export class AuthModule {}

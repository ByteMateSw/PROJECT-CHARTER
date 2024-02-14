import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { UserModule } from "../user/user.module";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { JwtStrategy } from "./jwt/jwt.strategy";
import { HashService } from "./hash.service";
import { ToSController } from "./ToS/ToS.controller";
import { ConfigModule, ConfigService } from "@nestjs/config"

@Module({
    imports: [
        ConfigModule,
        UserModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: async (configureService: ConfigService) => ({
                global: true,
                secret: configureService.get('jwt.secret'),
                signOptions: { expiresIn: configureService.get('jwt.expiration') }
            }),
            inject: [ConfigService]
        })
    ],
    controllers: [AuthController, ToSController],
    providers: [AuthService, HashService, JwtStrategy],
    exports: [AuthService]
})

export class AuthModule {}
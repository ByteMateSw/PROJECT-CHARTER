import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { UserModule } from "../user/user.module";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { jwtConstants } from "./jwt/jwt.constants"
import { JwtStrategy } from "./jwt/jwt.strategy";

@Module({
    imports: [
        UserModule,
        JwtModule.register( {
            global: true,
            secret: jwtConstants.secret,
            signOptions: {expiresIn: "60s"}
        })
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy],
    exports: [AuthService]
})

export class AuthModule {}
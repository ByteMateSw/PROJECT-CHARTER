import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { UserModule } from "../user/user.module";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { jwtConstants } from "./jwt/jwt.constants"
import { JwtStrategy } from "./jwt/jwt.strategy";
import { HashService } from "./hash.service";
import { ToSController } from "./ToS/Tos.controller";

@Module({
    imports: [
        UserModule,
        JwtModule.register( {
            global: true,
            secret: jwtConstants.secret,
            signOptions: {expiresIn: "3h"}
        })
    ],
    controllers: [AuthController, ToSController],
    providers: [AuthService, HashService, JwtStrategy],
    exports: [AuthService]
})

export class AuthModule {}
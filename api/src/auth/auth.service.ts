import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UserService } from "../user/user.service";
import { JwtService } from "@nestjs/jwt";
import { compareHash } from "src/user/middleware/encrypt.middleware";

@Injectable()
export class AuthService {
    constructor(private userService: UserService, private jwtService: JwtService) {}

    async SignIn(email: string, password: string): Promise<any>  {
        const user = await this.userService.getByEmail(email)
        if(!user)
            throw new UnauthorizedException();

        const passMatch = await compareHash(user.password, password)
        if(!passMatch)
            throw new UnauthorizedException();
        
        const payload = {sub: user.id, email: user.email}
        return {
            access_token: await this.jwtService.signAsync(payload)
        }
    }
}
import { HttpException, HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import { UserService } from "../user/user.service";
import { JwtService } from "@nestjs/jwt";
import { RegisterDto } from "./dto/register.dto";
import { HashService } from "./hash.service";

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService, 
        private hashService: HashService,
        private jwtService: JwtService) {}

    async signIn(email: string, password: string): Promise<any>  {
        const user = await this.userService.getByEmail(email)
        if(!user)
            throw new UnauthorizedException();

        const passMatch = await this.hashService.compareHash(user.password, password)
        if(!passMatch)
            throw new UnauthorizedException();
        
        const payload = {sub: user.id, email: user.email}
        return {
            access_token: await this.jwtService.signAsync(payload)
        }
    }

    async register(registerDto: RegisterDto) {
        try { 
            await this.userService.createUser(registerDto)
        } catch(error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
        }
    }
}
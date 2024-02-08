import { Body, Controller, HttpCode, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { SignInDto } from "./dto/signIn.dto";
import { RegisterDto } from "./dto/register.dto";
import { HashPipe } from "src/utils/pipes/hash.pipe";

@Controller("auth")
export class AuthController {
    constructor(private authService: AuthService) {}

    @HttpCode(201)
    @Post("register")
    async register(@Body(HashPipe) registerDto: RegisterDto) {
        return this.authService.register(registerDto)
    }

    @Post("login")
    signIn(@Body() signInDto: SignInDto) {
        return this.authService.signIn(signInDto.email, signInDto.password)
    }
}
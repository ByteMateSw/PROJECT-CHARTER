import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { SignInDto } from "./dto/signIn.dto";

@Controller("auth")
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post("login")
    signIn(@Body() signInDto: SignInDto) {
        return this.authService.SignIn(signInDto.email, signInDto.password)
    }
}
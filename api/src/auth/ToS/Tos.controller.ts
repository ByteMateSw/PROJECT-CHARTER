import { Controller, HttpCode, HttpException, HttpStatus, Param, Post } from "@nestjs/common";
import { UserService } from "../../user/user.service";

@Controller("ToS")
export class ToSController {
    constructor(private userService: UserService) {}
    
    @HttpCode(HttpStatus.ACCEPTED)
    @Post(":id/accept")
    async acceptToS(@Param("id") id: number) {
        try {
            await this.userService.accepteToSUser(id)
            return "Se aceptó los Términos y Servicios"
        } catch(error) {
            throw new HttpException("Bad credentials", HttpStatus.BAD_REQUEST)
        }
    }
}
import { Controller, Param, Post } from "@nestjs/common";
import { UserService } from "src/user/user.service";

@Controller("ToS")
export class ToSController {
    constructor(private userService: UserService) {}
    
    @Post(":id/accept")
    async acceptToS(@Param("id") id: number) {
        this.userService.accepteToSUser(id)
    }
}
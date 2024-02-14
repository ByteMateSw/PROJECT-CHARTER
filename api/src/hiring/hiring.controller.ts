import { Controller } from "@nestjs/common";
import { HiringService } from "./hiring.service";

@Controller('hiring')
export class HiringController {
    constructor(private hiringService: HiringService) {}
   
    
}

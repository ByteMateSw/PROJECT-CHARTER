import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/user/user.entity"
import { Hiring } from "./hiring.entity";
import { Repository } from "typeorm";
import { UserService } from "src/user/user.service";


@Injectable()
export class HiringService {
    constructor(@InjectRepository(Hiring) private hiringRepository: Repository<Hiring>, private userService: UserService) { }

    async createHire(contractorId: number, contractedId: number) {
        try {
            const userContractor = await this.userService.getById(contractorId)
            const userContracted = await this.userService.getById(contractedId)
            const actualTime: Date = new Date();
            const hire = this.hiringRepository.create();
            hire.contractor = userContractor
            hire.contracted = userContracted
            hire.dateApplication = actualTime
            return hire

        } catch (error) {
            console.log(error)
            throw new Error("Error al crear el contrato") 
        }

    }

    getAll(): Promise<Hiring[]>{
        return this.hiringRepository.find();
    }


}



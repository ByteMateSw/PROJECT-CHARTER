import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { User as IUser } from "./interface/user.interface"

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private userRepository: Repository<User>){}

    getAll() {
        return this.userRepository.find();
    }

    getById(id: number) {
        return this.userRepository.findOneBy({id})
    }

    async create(user: IUser) {
        const existEmail = await this.hasEmail(user.email)
        if(existEmail)
            throw new Error("Email has been in use")
        const newUser = this.userRepository.create(user)
        await this.userRepository.save(newUser)
    }

    async hasEmail(email: string): Promise<boolean> {
        return await this.userRepository.existsBy({email})
    }

}

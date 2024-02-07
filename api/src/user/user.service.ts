import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private userRepository: Repository<User>){}

    getAll() {
        return this.userRepository.find();
    }

    getById(id: number) {
        return this.userRepository.findOneBy({id})
    }

    getByEmail(email: string) {
        return this.userRepository.findOneBy({email})
    }

    async create(user) {
        const existEmail = await this.hasEmail(user.email)
        if(existEmail)
            throw new Error("Email has been in use")
        const newUser = this.userRepository.create(user)
        await this.userRepository.save(newUser)
    }

    async hasEmail(email: string): Promise<boolean> {
        return await this.userRepository.existsBy({email})
    }

    async delete(id: number) {
        const user = await this.userRepository.findOneBy({id})
        if(!user)
            throw new Error("User doesn't exists")

        user.isDeleted = true
        await this.userRepository.save(user)
    }

    async update(user) {
        const id = user.id;
        const userFound = await this.userRepository.existsBy({id})
        if(!userFound)
            throw new Error("User doesn't exists")
        
        await this.userRepository.update({id}, user)
    }
}

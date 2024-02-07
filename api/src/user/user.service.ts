import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/createUser.dto';

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private userRepository: Repository<User>) { }

    getAll() {
        return this.userRepository.find();
    }

    getById(id: number) {
        return this.userRepository.findOneBy({ id })
    }

    getByEmail(email: string) {
        return this.userRepository.findOneBy({ email })
    }

    async createUser(user: CreateUserDto): Promise<User> {
        const existEmail = await this.hasEmail(user.email)
        if (existEmail)
            throw new Error("El Email está en uso")
        const newUser = this.userRepository.create(user)
        await this.userRepository.save(newUser)
        return newUser
    }

    async hasEmail(email: string): Promise<boolean> {
        try {
            return await this.userRepository.existsBy({ email })
        } catch (error) {
            console.error("No se ha encontrado el Email", error.message)
            throw new error("No se ha encontrado el Email")
        }
    }

    async deleteUser(id: number): Promise<User> {
        const user = await this.userRepository.findOneBy({ id })
        if (!user)
            throw new Error("El usuario no existe")
        user.isDeleted = true
        await this.userRepository.save(user)
        return user
    }

    async updateUser(user): Promise<User> {
        const id = user.id;
        const userFound = await this.userRepository.existsBy({ id })
        if (!userFound)
            throw new Error("El usuario no existe")
        await this.userRepository.update({ id }, user)
        return user
    }
}

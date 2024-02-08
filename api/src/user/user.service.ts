import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { RegisterDto } from '../auth/dto/register.dto';
import { UpdateUserDto } from './dto/updateUser.dto';

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private userRepository: Repository<User>) { }

    async getAll() {
        return await this.userRepository.find();
    }

    async getById(id: number) {
        return await this.userRepository.findOneBy({ id })
    }

    async getByEmail(email: string) {
        return await this.userRepository.findOneBy({ email })
    }

    async createUser(user: RegisterDto): Promise<User> {
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
            throw new Error("No se ha encontrado el Email")
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

    async updateUser(id: number, user): Promise<User> {
        const userFound = await this.userRepository.existsBy({ id })
        if (!userFound)
            throw new Error("El usuario no existe")
        await this.userRepository.update({ id }, user)
        return user
    }

    async accepteToSUser(id: number) {
        const user = await this.getById(id);
        if(!user)
            throw new Error("Bad credentials");
        user.acceptedToS = true
        await this.userRepository.save(user)
    }
}

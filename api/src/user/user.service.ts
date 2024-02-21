import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { RegisterDto } from '../auth/dto/register.dto';
import { Role } from '../role/role.entity';
import { Role as RoleEmun } from '../utils/enums/role.enum';
import { UpdateUserDto } from './dto/updateUser.dto';
import { EmailAndOrId } from 'src/utils/types/functions.type';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Role) private roleRepository: Repository<Role>,
  ) {}

  async getAllUsers(): Promise<User[]> {
    return await this.userRepository.find({
      where: { isDeleted: false },
      relations: { city: true },
      select: {
        city: { id: false, name: true },
      },
    });
  }

  async getUser({ id, email }: EmailAndOrId): Promise<User> {
    return await this.userRepository.findOne({
      where: { id, email },
      relations: { city: true },
      select: {
        city: { id: false, name: true },
      },
    });
  }

  async createUser(user: RegisterDto): Promise<User> {
    const existEmail = await this.existsEmail(user.email);
    if (existEmail) throw new BadRequestException('El Email está en uso');
    const newUser = this.userRepository.create(user);
    const role = await this.roleRepository.findOneBy({ name: RoleEmun.User });
    newUser.role = role;
    await this.userRepository.save(newUser);
    return newUser;
  }

  async existsEmail(email: string): Promise<boolean> {
    return await this.userRepository.existsBy({ email });
  }

  async deleteUser(id: number): Promise<void> {
    const existsUser = await this.userRepository.existsBy({ id });
    if (!existsUser) throw new NotFoundException('El usuario no existe');
    await this.userRepository.update({ id }, { isDeleted: true });
  }

  async updateUser(id: number, user: UpdateUserDto): Promise<UpdateUserDto> {
    const userFound = await this.userRepository.existsBy({ id });
    if (!userFound) throw new NotFoundException('El usuario no existe');
    if (user.email !== undefined) {
      const existsEmail = this.userRepository.existsBy({ email: user.email });
      if (existsEmail) throw new BadRequestException('El email ya existe');
    }
    await this.userRepository.update({ id }, user);
    return user;
  }

  async isToSAcceptedByUser({ id, email }: EmailAndOrId): Promise<boolean> {
    const user = await this.userRepository.findOne({
      where: { id, email },
      select: { acceptedToS: true },
    });
    return user.acceptedToS;
  }

  async acceptToSUser(id: number): Promise<void> {
    const existsUser = await this.userRepository.existsBy({ id });
    if (!existsUser) throw new BadRequestException('Credenciales incorrectas');
    await this.userRepository.update({ id }, { acceptedToS: true });
  }

  async getRole(id: number): Promise<string> {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: { role: true },
      select: {
        id: true,
        role: { id: false, name: true },
      },
    });
    return user.role.name;
  }

  async getUserPassword(id: number): Promise<string> {
    const user = await this.userRepository.findOne({
      where: { id },
      select: {
        password: true,
      },
    });
    return user.password;
  }

  async getRefreshToken(id: number): Promise<string> {
    const user = await this.userRepository.findOne({
      where: { id },
      select: { refreshToken: true },
    });
    if (!user) throw new NotFoundException('El usuario no existe');
    return user.refreshToken;
  }

  async updateRefreshToken(id: number, refreshToken: string) {
    const userFound = await this.userRepository.existsBy({ id });
    if (!userFound) throw new NotFoundException('El usuario no existe');
    await this.userRepository.update({ id }, { refreshToken });
  }
}

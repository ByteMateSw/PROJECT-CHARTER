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
import { UserSelection } from './user-select';
import { UpdateUserDto } from './dto/updateUser.dto';

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

  async getUserById(id: number): Promise<User> {
    return await this.userRepository.findOneBy({ id });
  }

  async getByEmail(email: string): Promise<User> {
    return await this.userRepository.findOneBy({ email });
  }

  async createUser(user: RegisterDto): Promise<User> {
    const existEmail = await this.hasEmail(user.email);
    if (existEmail) throw new BadRequestException('El Email está en uso');
    const newUser = this.userRepository.create(user);
    const role = await this.roleRepository.findOneBy({ name: RoleEmun.User });
    newUser.role = role;
    await this.userRepository.save(newUser);
    return newUser;
  }

  async hasEmail(email: string): Promise<boolean> {
    return await this.userRepository.existsBy({ email });
  }

  async deleteUser(id: number): Promise<User> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) throw new NotFoundException('El usuario no existe');
    user.isDeleted = true;
    await this.userRepository.save(user);
    return user;
  }

  async updateUser(id: number, user: UpdateUserDto): Promise<UpdateUserDto> {
    const userFound = await this.userRepository.existsBy({ id });
    if (!userFound) throw new NotFoundException('El usuario no existe');
    await this.userRepository.update({ id }, user);
    return user;
  }

  async accepteToSUser(id: number): Promise<void> {
    const user = await this.getUserById(id);
    if (!user) throw new BadRequestException('Bad credentials');
    user.acceptedToS = true;
    await this.userRepository.save(user);
  }

  async getRole(id: number): Promise<string> {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: { role: true },
      select: {
        ...UserSelection,
        role: { id: false, name: true },
      },
    });
    return user.role.name;
  }

  async getPassword(id: number): Promise<string> {
    const user = await this.userRepository.findOne({
      where: { id },
      select: {
        ...UserSelection,
        password: true,
      },
    });
    return user.password;
  }

  async getRefreshToken(id: number): Promise<string> {
    const user = await this.userRepository.findOne({
      where: { id },
      select: { ...UserSelection, refreshToken: true },
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

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
import { Role as RoleEnum } from '../utils/enums/role.enum';
import { UpdateUserDto } from './dto/updateUser.dto';
import {
  EmailAndOrId,
  EmailUsernameAndOrId,
} from '../utils/types/functions.type';
import { UserFilter } from './dto/userFilter.dto';
import { UserPagination } from './dto/userpagination.dto';
import { UserRepository } from './repository/user.repository';
import { S3Service } from 'src/storage/s3.service';
import 'dotenv/config';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: UserRepository,
    @InjectRepository(Role) private roleRepository: Repository<Role>,
    private s3Service: S3Service,
  ) {}

  async getAllUsers({
    page,
    limit,
  }: {
    page?: number;
    limit?: number;
  }): Promise<User[]> {
    return await this.userRepository.find({
      where: { isDeleted: false, isWorker: true },
      relations: {
        city: true,
        offices: true,
        reviews: true,
        posts: true,
        notifications: true,
        experience: true,
      },
      select: {
        city: { id: false, name: true },
      },
      skip: page,
      take: limit,
    });
  }

  async getUsersFilter(
    filter: UserFilter,
    pagination: UserPagination,
  ): Promise<User[]> {
    const { habilities, location } = filter;
    const { limit, page } = pagination;
    const query = this.userRepository.createQueryBuilder('user');
    query.leftJoinAndSelect('user.city', 'city');
    query.leftJoinAndSelect('user.experience', 'experience');

    if (habilities) {
      query.andWhere('user.habilities = :habilities', { habilities });
    }

    if (location) {
      query.andWhere('city.name = :name', { name: location });
    }
    const users = await query.skip(page).take(limit).getMany();
    return users;
  }

  async getUserBy({
    id,
    email,
    username,
  }: EmailUsernameAndOrId): Promise<User> {
    return await this.userRepository.findOne({
      where: { id, email, username },
      relations: {
        city: true,
        offices: true,
        reviews: true,
        posts: true,
        notifications: true,
        experience: true,
      },
      select: {
        city: { id: false, name: true },
      },
    });
  }

  async getUserById(id: number): Promise<User> {
    try {
      const user = await this.userRepository.findOneBy({ id });
      return user;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async createUser(user: RegisterDto): Promise<User> {
    const existEmail = await this.existsEmail(user.email);
    if (existEmail) throw new BadRequestException('El Email está en uso');
    const newUser = this.userRepository.create(user);
    const role = await this.roleRepository.findOneBy({ name: RoleEnum.User });
    newUser.role = role;
    await this.userRepository.save(newUser);
    return newUser;
  }

  async existsEmail(email: string): Promise<boolean> {
    return await this.userRepository.existsBy({ email });
  }

  async googleAccountVerify(email: string) {
    const user = await this.userRepository.findOne({
      where: { email },
    });
    if (!user) {
      return false;
    }
    return user;
  }

  async deleteUser(id: number): Promise<void> {
    const existsUser = await this.userRepository.existsBy({ id });
    if (!existsUser) throw new BadRequestException('El usuario no existe');
    await this.userRepository.update({ id }, { isDeleted: true });
  }

  

  async updateUser(id: number, updateUser: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) throw new BadRequestException('El usuario no existe');

    if (updateUser.email !== undefined) {
      const existsEmail = await this.userRepository.existsBy({
        email: updateUser.email,
      });
      if (existsEmail) throw new BadRequestException('El email ya existe');
    }

    if (updateUser.photo) {
      const profileImagePath = await this.s3Service.uploadFile(
        updateUser.photo.originalname,
        `users/${id}/profile`,
        updateUser.photo.mimetype,
        updateUser.photo.buffer,
      );
      updateUser.photo = process.env.R2_PUBLIC_DOMAIN + profileImagePath;
    }

    if (updateUser.backgroundPhoto) {
      const coverImagePath = await this.s3Service.uploadFile(
        updateUser.backgroundPhoto.originalname,
        `users/${id}/cover`,
        updateUser.backgroundPhoto.mimetype,
        updateUser.backgroundPhoto.buffer,
      );
      updateUser.backgroundPhoto = process.env.R2_PUBLIC_DOMAIN + coverImagePath;
    }

    return await this.userRepository.save({ ...user, ...updateUser });
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
    if (user.role === undefined) return RoleEnum.User;
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

  async validateUser({ id, email }: EmailAndOrId) {
    const user = await this.userRepository.findOne({ where: { id, email } });
    if (!user) throw new BadRequestException('No se encontró el usuario');
    user.isAccountValidate = true;
    await this.userRepository.save(user);
  }

  async removeRefreshToken(userId: number): Promise<void> {
    await this.userRepository.update(userId, { refreshToken: null });
  }

  async getAllWorkers(): Promise<User[]> {
    return await this.userRepository.find({
      where: { isWorker: true, isDeleted: false },
      relations: { city: true },
      select: {
        city: { id: false, name: true },
      },
    });
  }
}

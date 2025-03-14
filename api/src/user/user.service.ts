import {
  BadRequestException,
  ForbiddenException,
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
import { City } from 'src/city/city.entity';
import { Office } from 'src/office/office.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: UserRepository,
    @InjectRepository(Role) private roleRepository: Repository<Role>,
    @InjectRepository(City) private cityRepository: Repository<City>,
    @InjectRepository(Office) private officeRepository: Repository<Office>,
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
    offices: string,
  ): Promise<{ count: number; users: User[] }> {
    const { habilities, location } = filter;
    const { limit, page } = pagination;
    const query = this.userRepository.createQueryBuilder('user');
    query.leftJoinAndSelect('user.city', 'city');
    query.leftJoinAndSelect('user.experience', 'experience');
    query.leftJoinAndSelect('user.offices', 'offices');
    const officeParse = JSON.parse(offices);
    // query.innerJoinAndSelect(
    //   'user.offices',
    //   'offices',
    //   'offices.name IN (:...dataOfi)',
    //   { dataOfi },
    // );
    const usersCount = await this.userRepository.countBy({});

    if (habilities) {
      query.where('LOWER(user.habilities) LIKE LOWER(:habilities)', {
        habilities: `%${habilities}%`,
      });
    }

    if (location) {
      query.andWhere('city.name = :name', { name: location });
    }

    if (officeParse.length > 0) {
      query.andWhere('offices.name IN (:...officeParse)', { officeParse });
    }
    const users = await query.skip(page).take(limit).getMany();
    return {
      count: usersCount,
      users,
    };
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

  async getUserOffices(userId: number): Promise<Office[]> {
    try {
      const user = await this.userRepository.findOne({
        relations: ['offices'],
        where: { id: userId },
      });
      return user.offices;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async getUserByEmail(email: string) {
    try {
      const user = await this.userRepository.findOneBy({ email });
      if (user) {
        return user;
      }
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async getUserById(id: number): Promise<User> {
    try {
      const user = await this.userRepository.findOneBy({ id });
      return user;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async getUsersByScore(): Promise<User[]> {
    try {
      const users = await this.userRepository.find({
        order: {
          score: 'DESC',
        },
        take: 4,
        relations: {
          offices: true,
        },
      });
      return users;
    } catch (error) {
      throw new ForbiddenException(error);
    }
  }

  async createUser(user: RegisterDto): Promise<User> {
    const existEmail = await this.existsEmail(user.email);
    const existUserName = await this.existsUserName(user.username);
    console.log(existUserName);
    if (existEmail) throw new BadRequestException('El Email está en uso');
    if (existUserName)
      throw new BadRequestException('El Nombre de usuario ya existe');
    const newUser = this.userRepository.create(user);
    const role = await this.roleRepository.findOneBy({ name: RoleEnum.User });
    newUser.role = role;
    await this.userRepository.save(newUser);
    return newUser;
  }

  async existsEmail(email: string): Promise<boolean> {
    return await this.userRepository.existsBy({ email });
  }

  async existsUserName(username: string): Promise<boolean> {
    return await this.userRepository.existsBy({ username });
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
      updateUser.backgroundPhoto =
        process.env.R2_PUBLIC_DOMAIN + coverImagePath;
    }

    return await this.userRepository.save({ ...user, ...updateUser });
  }

  async updateCity(userId: number, cityId: number) {
    try {
      const city = await this.cityRepository.findOneBy({ id: cityId });
      await this.userRepository.update(userId, { city });
    } catch (error) {
      throw new BadRequestException(error);
    }
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

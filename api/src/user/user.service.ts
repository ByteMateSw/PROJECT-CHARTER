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
import { EmailAndOrId, EmailUsernameAndOrId } from '../utils/types/functions.type';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Role) private roleRepository: Repository<Role>,
  ) {}

  /**
   * Retrieves all users from the database.
   * @returns A promise that resolves to an array of User objects.
   */
  async getAllUsers({
    page,
    limit,
  }: {
    page?: number;
    limit?: number;
  }): Promise<User[]> {
    return await this.userRepository.find({
      where: { isDeleted: false },
      relations: { city: true },
      select: {
        city: { id: false, name: true },
      },
      skip: page,
      take: limit,
    });
  }

  /**
   * Retrieves a user by their ID or email.
   * @param id - The ID of the user.
   * @param email - The email of the user.
   * @returns A promise that resolves to a User object.
   */
  async getUserBy({ id, email, username }: EmailUsernameAndOrId): Promise<User> {
    return await this.userRepository.findOne({
      where: { id, email, username },
      relations: { city: true, offices: true, reviews: true, posts: true },
      select: {
        city: { id: false, name: true },
      },
    });
  }

  /**
   * Creates a new user.
   * @param user - The user data.
   * @returns A promise that resolves to the created User object.
   * @throws BadRequestException if the email is already in use.
   */
  async createUser(user: RegisterDto): Promise<User> {
    const existEmail = await this.existsEmail(user.email);
    if (existEmail) throw new BadRequestException('El Email está en uso');
    const newUser = this.userRepository.create(user);
    const role = await this.roleRepository.findOneBy({ name: RoleEmun.User });
    newUser.role = role;
    await this.userRepository.save(newUser);
    return newUser;
  }

  /**
   * Checks if an email already exists in the database.
   * @param email - The email to check.
   * @returns A promise that resolves to a boolean indicating if the email exists.
   */
  async existsEmail(email: string): Promise<boolean> {
    return await this.userRepository.existsBy({ email });
  }

  /**
   * Deletes a user by their ID.
   * @param id - The ID of the user to delete.
   * @throws BadRequestException if the user does not exist.
   */
  async deleteUser(id: number): Promise<void> {
    const existsUser = await this.userRepository.existsBy({ id });
    if (!existsUser) throw new BadRequestException('El usuario no existe');
    await this.userRepository.update({ id }, { isDeleted: true });
  }

  /**
   * Updates a user by their ID.
   * @param id - The ID of the user to update.
   * @param user - The updated user data.
   * @returns A promise that resolves to the updated user data.
   * @throws NotFoundException if the user does not exist.
   * @throws BadRequestException if the email already exists.
   */
  async updateUser(id: number, updateUser: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) throw new BadRequestException('El usuario no existe');
    if (updateUser.email !== undefined) {
      const existsEmail = await this.userRepository.existsBy({
        email: updateUser.email,
      });
      if (existsEmail) throw new BadRequestException('El email ya existe');
    }
    return await this.userRepository.save({ ...user, ...updateUser });
  }

  /**
   * Retrieves the role of a user by their ID.
   * @param id - The ID of the user.
   * @returns A promise that resolves to the name of the user's role.
   */
  async getRole(id: number): Promise<string> {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: { role: true },
      select: {
        id: true,
        role: { id: false, name: true },
      },
    });
    if (user.role === undefined) return RoleEmun.User;
    return user.role.name;
  }

  /**
   * Retrieves the password of a user by their ID.
   * @param id - The ID of the user.
   * @returns A promise that resolves to the user's password.
   */
  async getUserPassword(id: number): Promise<string> {
    const user = await this.userRepository.findOne({
      where: { id },
      select: {
        password: true,
      },
    });
    return user.password;
  }

  /**
   * Retrieves the refresh token of a user by their ID.
   * @param id - The ID of the user.
   * @returns A promise that resolves to the user's refresh token.
   * @throws NotFoundException if the user does not exist.
   */
  async getRefreshToken(id: number): Promise<string> {
    const user = await this.userRepository.findOne({
      where: { id },
      select: { refreshToken: true },
    });
    if (!user) throw new NotFoundException('El usuario no existe');
    return user.refreshToken;
  }

  /**
   * Updates the refresh token of a user by their ID.
   * @param id - The ID of the user.
   * @param refreshToken - The new refresh token.
   * @returns A promise that resolves when the refresh token is updated.
   * @throws NotFoundException if the user does not exist.
   */
  async updateRefreshToken(id: number, refreshToken: string) {
    const userFound = await this.userRepository.existsBy({ id });
    if (!userFound) throw new NotFoundException('El usuario no existe');
    await this.userRepository.update({ id }, { refreshToken });
  }

  /**
   * Validates a user's account by their ID and email.
   * @param id - The ID of the user.
   * @param email - The email of the user.
   * @returns A promise that resolves when the user's account is validated.
   * @throws BadRequestException if the user does not exist.
   */
  async validateUser({ id, email }: EmailAndOrId) {
    const user = await this.userRepository.findOne({ where: { id, email } });
    if (!user) throw new BadRequestException('No se encontró el usuario');
    user.isAccountValidate = true;
    await this.userRepository.save(user);
  }
}

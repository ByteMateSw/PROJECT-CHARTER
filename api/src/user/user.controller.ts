import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/updateUser.dto';
import { AccessTokenGuard } from '../auth/jwt/access.guard';
import { EmptyBodyPipe } from '../utils/pipes/empty-body.pipe';
import { Roles } from '../role/role.decorator';
import { Role } from '../utils/enums/role.enum';
import { User } from './user.entity';
import { CustomParseIntPipe } from '../utils/pipes/parse-int.pipe';
import {
  ResponseMessage,
  UserParam as UserParamType,
} from '../utils/types/functions.type';
import { UserParam } from '../utils/params/user.param';

/**
 * Controller for handling user-related operations.
 */
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}


  @Get('best-users')
  /**
   * Retrieves a list of users.
   * @returns A promise that resolves to an array of BestUser objects whitout guard.
   */
  async getSomeUsers(): Promise<User[]> {
    return await this.userService.getAllUsers();
  }

  /**
   * Retrieves all users.
   * @returns A promise that resolves to an array of User objects.
   */
  @UseGuards(AccessTokenGuard)
  @Get()
  async getAllUsers(): Promise<User[]> {
    return await this.userService.getAllUsers();
  }

  /**
   * Retrieves a user by their ID.
   * @param id - The ID of the user.
   * @returns A promise that resolves to the User object.
   * @throws NotFoundException if the user is not found.
   */
  @UseGuards(AccessTokenGuard)
  @Get(':id')
  async getUserById(
    @Param('id', CustomParseIntPipe) id: number,
  ): Promise<User> {
    const user = await this.userService.getUser({ id });
    if (!user) throw new NotFoundException('No se encontró el usuario');
    return user;
  }

  /**
   * Deletes a user.
   * @param user - The user to be deleted.
   * @returns  - A json object with a message.
   */
  @UseGuards(AccessTokenGuard)
  @Delete('')
  async deleteUser(@UserParam() user: UserParamType): Promise<ResponseMessage> {
    await this.userService.deleteUser(user.id);
    return { message: 'El usuario ha sido borrado correctamente' };
  }

  /**
   * Deletes a user by their ID.
   * @param id - The ID of the user to be deleted.
   * @returns - A json object with a message.
   */
  @Roles(Role.Admin)
  @Delete(':id')
  async deleteUserById(
    @Param('id', CustomParseIntPipe) id: number,
  ): Promise<ResponseMessage> {
    await this.userService.deleteUser(id);
    return { message: 'El usuario ha sido borrado correctamente' };
  }

  /**
   * Updates a user.
   * @param id - The ID of the user to be updated.
   * @param updateUserDto - The data to update the user with.
   * @returns - A json object with a message.
   */
  @UseGuards(AccessTokenGuard)
  @Patch(':id')
  async updateUser(
    @Param('id', CustomParseIntPipe) id: number,
    @Body(EmptyBodyPipe) updateUserDto: UpdateUserDto,
  ): Promise<ResponseMessage> {
    await this.userService.updateUser(id, updateUserDto);
    return { message: 'El usuario se ha actualizado correctamente' };
  }
}

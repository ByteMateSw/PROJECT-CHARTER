import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Query,
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
import { UserParam as UserParamType } from '../utils/types/functions.type';
import { UserParam } from '../utils/params/user.param';
import { QueryNumberPipe } from '../utils/pipes/query-number.pipe';

/**
 * Controller for handling user-related operations.
 */
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('best-users')
  /**
   * Retrieves a list of users.
   * @returns A promise that resolves to an array of BestUser objects whitout guard.
   */
  async getSomeUsers(): Promise<User[]> {
    return await this.userService.getAllUsers({});
  }

  /**
   * Retrieves all users.
   * @returns A promise that resolves to an array of User objects.
   */
  @UseGuards(AccessTokenGuard)
  @Get()
  async getAllUsers(
    @Query('page', QueryNumberPipe) page: number | undefined,
    @Query('limit', QueryNumberPipe) limit: number | undefined,
  ): Promise<User[]> {
    return await this.userService.getAllUsers({ page, limit });
  }

  /**
   * Retrieves a user by their ID.
   * @param id - The ID of the user.
   * @returns A promise that resolves to the User object.
   */
  @UseGuards(AccessTokenGuard)
  @Get(':id')
  async getUserById(
    @Param('id', CustomParseIntPipe) id: number,
  ): Promise<User> {
    return await this.userService.getUserBy({ id });
  }

  /**
   * Deletes a user. Only the user themselves can delete their account.
   * @param user - The user to be deleted.
   */
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(AccessTokenGuard)
  @Delete()
  async deleteUser(@UserParam() user: UserParamType): Promise<void> {
    await this.userService.deleteUser(user.id);
  }

  /**
   * Deletes a user by their ID. Only users with the admin role can delete users.
   * @param id - The ID of the user to be deleted.
   */
  @HttpCode(HttpStatus.NO_CONTENT)
  @Roles(Role.Admin)
  @Delete(':id')
  async deleteUserById(
    @Param('id', CustomParseIntPipe) id: number,
  ): Promise<void> {
    await this.userService.deleteUser(id);
  }

  /**
   * Updates a user.
   * @param id - The ID of the user to be updated.
   * @param updateUserDto - The data to update the user with.
   * @returns -
   */
  @UseGuards(AccessTokenGuard)
  @Patch(':id')
  async updateUser(
    @Param('id', CustomParseIntPipe) id: number,
    @Body(EmptyBodyPipe) updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return await this.userService.updateUser(id, updateUserDto);
  }
}

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
  Req,
  UnauthorizedException,
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
import { UserFilter } from './dto/userFilter.dto';
import { UserPagination } from './dto/userpagination.dto';

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

  @Get('/google-verify')
  async googleAccountVerify(@Query('email') email: string) {
    return await this.userService.googleAccountVerify(email);
  }

  @Get('filter')
  async userFilter(
    @Query('limit') limit: number,
    @Query('page') page: number,
    @Query('habilities') habilities: string,
    @Query('location') location: string,
  ) {
    const filter: UserFilter = {
      habilities,
      location,
    };
    const pagination: UserPagination = {
      limit,
      page,
    };
    return await this.userService.getUsersFilter(filter, pagination);
  }

  /**
   * Retrieves a user by their ID.
   * @param id - The ID of the user.
   * @returns A promise that resolves to the User object.
   */
  @Get(':username')
  async getUserById(@Param('username') username: string): Promise<User> {
    return await this.userService.getUserBy({ username });
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

  @Patch(':id')
  async updateUser(
    @Param('id', CustomParseIntPipe) id: number,
    @Body(EmptyBodyPipe) updateUserDto: UpdateUserDto,
    @Req() req: any,
  ): Promise<User> {
    // const userId = req.session.userId; // o donde sea que almacenes el ID del usuario en la sesión
    // if (userId !== id) {
    //   throw new UnauthorizedException('No estás autorizado para modificar este usuario');
    // }
    // console.log(req);
    return await this.userService.updateUser(id, updateUserDto);
  }
}

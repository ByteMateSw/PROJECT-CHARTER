import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/updateUser.dto';
import { AccessTokenGuard } from '../auth/jwt/access.guard';
import { Roles } from '../role/role.decorator';
import { Role } from '../utils/enums/role.enum';
import { User } from './user.entity';
import { CustomParseIntPipe } from '../utils/pipes/parse-int.pipe';
import {
  File,
  UserParam as UserParamType,
} from '../utils/types/functions.type';
import { UserParam, UserParamID } from '../utils/params/user.param';
import { QueryNumberPipe } from '../utils/pipes/query-number.pipe';
import { FileInterceptor } from '@nestjs/platform-express';
import { Role as RoleEnum } from '../../src/utils/enums/role.enum';
import { FileNamePipe, FilePipeValidator } from 'src/utils/pipes/file.pipe';
import { InfoParam } from 'src/utils/params/info.param';

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

  /**
   * Updates the user info.
   * @param id - The ID of the user to be updated given by its token.
   * @param updateUserDto - The data to update the user with.
   * @returns -
   */
  @UseGuards(AccessTokenGuard)
  @UseInterceptors(FileInterceptor('avatar'))
  @Patch()
  async updateUser(
    @UserParamID(CustomParseIntPipe) id: number,
    @InfoParam() updateUserDto: UpdateUserDto,
    @UploadedFile(FilePipeValidator, new FileNamePipe('avatar'))
    profileImage: File,
  ): Promise<User> {
    return await this.userService.updateUser(id, updateUserDto, profileImage);
  }

  /**
   * Updates a user by its Id.
   * @param id - The ID of the user to be updated.
   * @param updateUserDto - The data to update the user with.
   * @returns -
   */
  @Roles(RoleEnum.Admin)
  @UseInterceptors(FileInterceptor('avatar'))
  @Patch(':id')
  async updateUserById(
    @Param('id', CustomParseIntPipe) id: number,
    @InfoParam() updateUserDto: UpdateUserDto,
    @UploadedFile(FilePipeValidator, new FileNamePipe('avatar'))
    profileImage: File,
  ) /*: Promise<User>*/ {
    return profileImage;
    //return await this.userService.updateUser(id, updateUserDto, profileImage);
  }
}

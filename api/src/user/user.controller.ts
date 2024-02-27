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
import { RoleGuard } from '../role/role.guard';
import { Roles } from '../role/role.decorator';
import { Role } from '../utils/enums/role.enum';
import { User } from './user.entity';
import { CustomParseIntPipe } from '../utils/pipes/parse-int.pipe';
import { ResponseMessage } from '../utils/types/functions.type';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(AccessTokenGuard)
  @Get()
  async getAllUsers(): Promise<User[]> {
    return await this.userService.getAllUsers();
  }

  @UseGuards(AccessTokenGuard)
  @Get(':id')
  async getUserById(
    @Param('id', CustomParseIntPipe) id: number,
  ): Promise<User> {
    const user = await this.userService.getUser({ id });
    if (!user) throw new NotFoundException('No se encontró el usuario');
    return user;
  }

  @Roles(Role.Admin)
  @UseGuards(AccessTokenGuard, RoleGuard)
  @Delete(':id')
  async deleteUser(
    @Param('id', CustomParseIntPipe) id: number,
  ): Promise<ResponseMessage> {
    await this.userService.deleteUser(id);
    return { message: 'El usuario ha sido borrado correctamente' };
  }

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

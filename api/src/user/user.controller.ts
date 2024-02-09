import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Put, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/updateUser.dto';
import { JwtAuthGuard } from  '../auth/jwt/jwt-auth.guard';
import { EmptyBodyPipe } from '../utils/pipes/empty-body.pipe';
import { RoleGuard } from '../role/role.guard';
import { Roles } from '../role/role.decorator';
import { Role } from '../utils/enums/role.enum';

@UseGuards(JwtAuthGuard)
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async getAll() {
    return await this.userService.getAll();
  }

  @Get(":id")
  async getById(@Param("id") id: number) {
    return await this.userService.getById(id);
  }

  @Roles(Role.Admin)
  @UseGuards(RoleGuard)
  @Delete(":id")
  async deleteUser(@Param("id") id:number): Promise<{message: string}> {
    try {
      await this.userService.deleteUser(id)
      return { message: "El usuario ha sido borrado correctamente " }
    } catch(error) {
      throw new HttpException(error.message, HttpStatus.FORBIDDEN)
    }
  }

  @Put(":id")
  async updateUser(@Param("id")  id: number, @Body(EmptyBodyPipe) updateUserDto: UpdateUserDto): Promise<{message: string}> {
    try {
      await this.userService.updateUser(id, updateUserDto)
      return { message: "El usuario se ha actualizado correctamente" }
    } catch(error) {
      throw new HttpException(error.message, HttpStatus.FORBIDDEN)
    }
  }
}

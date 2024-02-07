import { Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/updateUser.dto';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  getAll() {
    return this.userService.getAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(":id")
  getById(@Param("id") id: number, @Body() body) {
    console.log(body);
    return this.userService.getById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  async delete(@Param("id") id:number) {
    try {
      await this.userService.delete(id)
    } catch(error) {
      throw new HttpException(error.message, HttpStatus.FORBIDDEN)
    }
  }

  @UseGuards(JwtAuthGuard)
  @Patch(":id")
  async update(@Body() updateUserDto: UpdateUserDto) {
    try {
      await this.userService.update(updateUserDto)
    } catch(error) {
      throw new HttpException(error.message, HttpStatus.FORBIDDEN)
    }
  }
}

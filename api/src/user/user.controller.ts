import { Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/createUser.dto';
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
  getById(@Param("id") id: number) {
    return this.userService.getById(id);
  }

  @HttpCode(201)
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      await this.userService.create(createUserDto)
    } catch(error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
    }
  }

  @Delete(":id")
  async delete(@Param("id") id:number) {
    try {
      await this.userService.delete(id)
    } catch(error) {
      throw new HttpException(error.message, HttpStatus.FORBIDDEN)
    }
  }

  @Patch(":id")
  async update(@Body() updateUserDto: UpdateUserDto) {
    try {
      await this.userService.update(updateUserDto)
    } catch(error) {
      throw new HttpException(error.message, HttpStatus.FORBIDDEN)
    }
  }
}

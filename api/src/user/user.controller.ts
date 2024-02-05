import { Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/createUser.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  getAll() {
    return this.userService.getAll();
  }

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
}

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
  async createUser(@Body() createUserDto: CreateUserDto): Promise<string> {
    try {
      await this.userService.createUser(createUserDto)
      return "Usuario creado correctamente"
    } catch(error) {
      console.error("Error al crear el usuario", error.message)
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  async deleteUser(@Param("id") id:number):Promise<string> {
    try {
      await this.userService.deleteUser(id)
      return "El usuario ha sido borrado correctamente "
    } catch(error) {
      console.error("El usuario no se ha podido borrar", error.message)
      throw new HttpException(error.message, HttpStatus.FORBIDDEN)
    }
  }

  @UseGuards(JwtAuthGuard)
  @Patch(":id")
  async updateUser(@Body() updateUserDto: UpdateUserDto) {
    try {
      await this.userService.updateUser(updateUserDto)
      return "El usuario se ha actualizado correctamente"
    } catch(error) {
      console.error("El usuario no se ha podido actualizar", error.message)
      throw new HttpException(error.message, HttpStatus.FORBIDDEN)
    }
  }
}

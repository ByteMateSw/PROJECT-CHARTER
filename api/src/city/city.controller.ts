import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  ParseIntPipe,
  Param,
  Delete,
  HttpCode,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { CityService } from './city.service';

@Controller('city')
export class CityController {
  constructor(private cityService: CityService) {}

  //Crear provincia sin relacion ( Solo un nombre )
  @Post('/save')
  createCity(@Body('name') name: string) {
    return this.cityService.createCity(name);
  }

  //Obtener lista de ciudades
  @Get('/list')
  getCities() {
    return this.cityService.getCities();
  }

  //Obtener una sola ciudad
  @Get('/one/:id')
  getOneCity(@Param('id', ParseIntPipe) id: number) {
    return this.cityService.getOneCity(id);
  }

  //Actualizar la ciudad (nombre)
  @Put('/update/:id')
  updateCity(
    @Param('id', ParseIntPipe) id: number,
    @Body('name') name: string,
  ) {
    return this.cityService.updateCity(id, name);
  }

  //Agregar una provincia a la ciudad
  @Put('/addProvinceTo/:id')
  updateCityProvince(
    @Param('id', ParseIntPipe) id: number,
    @Body('provinceId', ParseIntPipe) provinceId: number,
  ) {
    return this.cityService.updateCityProvince(id, provinceId);
  }

  //Agregar un usuario a la ciudad
  @Put('/addUserTo/:id')
  updateCityUser(
    @Param('id', ParseIntPipe) id: number,
    @Body('userId', ParseIntPipe) userId: number,
  ) {
    return this.cityService.updateCityUser(id, userId);
  }

  //Eliminiar Ciudad
  @Delete('/delete/:id')
  deleteCity(@Param('id', ParseIntPipe) id: number) {
    return this.cityService.deleteCity(id);
  }

  @HttpCode(200)
  @Get('search')
    async getcityBySearch(name:string):Promise<string>{
      try {
        const city = this.cityService.getCityBySearch(name)
        return city
      } catch (error) {
        console.log(Error)
        throw new HttpException(error.message, HttpStatus.NOT_FOUND);   
      }
  }
}

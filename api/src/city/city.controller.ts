import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  ParseIntPipe,
  Param,
  Delete,
} from '@nestjs/common';
import { CityService } from './city.service';

@Controller('city')
export class CityController {
  constructor(private cityService: CityService) {}

  //Crear provincia sin relacion ( Solo un nombre )
  @Post('/save')
  createCity(@Body() newCity) {
    return this.cityService.createCity(newCity);
  }

  //Obtener lista de ciudades
  @Get('/list')
  getCities() {
    return this.cityService.getCity();
  }

  //Obtener una sola ciudad
  @Get('/one/:id')
  getOneCity(@Param('id', ParseIntPipe) id: number) {
    return this.cityService.getOneCity(id);
  }

  //Actualizar la ciudad
  @Put('/update/:id')
  updateCity(
    @Param('id', ParseIntPipe) id: number,
    @Body()
    province,
  ) {
    return this.cityService.updateCity(id, province);
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

  /*
  //Crear provincia con relacion (Nombre de la ciduad y Id de la provincia)
  @Post('/saveWithRelation')
  createCityWithRelation(@Body() newCity) {
    return this.cityService.createCityWithRelation(newCity);
  }*/
}

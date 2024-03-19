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

/**
 * Controller for handling city-related operations.
 */
@Controller('city')
export class CityController {
  constructor(private cityService: CityService) {}

  /**
   * Creates a new city.
   * @param name - The name of the city.
   * @returns A promise that resolves to the created city.
   */
  @Post('/save')
  createCity(@Body('name') name: string) {
    return this.cityService.createCity(name);
  }

  /**
   * Retrieves all cities.
   * @returns A promise that resolves to an array of City objects.
   */
  @Get('/list')
  getCities() {
    return this.cityService.getCities();
  }

  /**
   * Retrieves a city by its ID.
   * @param id - The ID of the city.
   * @returns A promise that resolves to the City object.
   */
  @Get('/one/:id')
  getOneCity(@Param('id', ParseIntPipe) id: number) {
    return this.cityService.getOneCity(id);
  }

  /**
   * Updates a city.
   * @param id - The ID of the city.
   * @param name - The new name of the city.
   * @returns A promise that resolves to the updated city.
   */
  @Put('/update/:id')
  updateCity(
    @Param('id', ParseIntPipe) id: number,
    @Body('name') name: string,
  ) {
    return this.cityService.updateCity(id, name);
  }

  /**
   * Adds a province to a city.
   * @param id - The ID of the city.
   * @param provinceId - The ID of the province.
   * @returns A promise that resolves to the updated city.
   */
  @Put('/addProvinceTo/:id')
  updateCityProvince(
    @Param('id', ParseIntPipe) id: number,
    @Body('provinceId', ParseIntPipe) provinceId: number,
  ) {
    return this.cityService.updateCityProvince(id, provinceId);
  }

  /**
   * Adds a user to a city.
   * @param id - The ID of the city.
   * @param userId - The ID of the user.
   * @returns A promise that resolves to the updated city.
   */
  @Put('/addUserTo/:id')
  updateCityUser(
    @Param('id', ParseIntPipe) id: number,
    @Body('userId', ParseIntPipe) userId: number,
  ) {
    return this.cityService.updateCityUser(id, userId);
  }

  /**
   * Deletes a city.
   * @param id - The ID of the city.
   * @returns A promise that resolves to the deleted city.
   */
  @Delete('/delete/:id')
  deleteCity(@Param('id', ParseIntPipe) id: number) {
    return this.cityService.deleteCity(id);
  }

  /**
   * Retrieves a city by its name.
   * @param name - The name of the city.
   * @returns A promise that resolves to the City object.
   */
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

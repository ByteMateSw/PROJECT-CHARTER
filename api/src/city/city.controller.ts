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
import { City } from './city.entity';
import { Roles } from '../role/role.decorator';
import { Role } from '../utils/enums/role.enum';
import { CustomParseIntPipe } from 'src/utils/pipes/parse-int.pipe';

/**
 * Controller for handling city-related operations.
 */
@Controller('cities')
export class CityController {
  constructor(private cityService: CityService) {}

  /**
   * Creates a new city.
   * @param name - The name of the city.
   * @returns A promise that resolves to the created city.
   */
  @Roles(Role.Admin)
  @Post()
  async createCity(@Body('name') name: string): Promise<City> {
    return await this.cityService.createCity(name);
  }

  /**
   * Retrieves all cities.
   * @returns A promise that resolves to an array of City objects.
   */
  @Get()
  getAllCities(): Promise<City[]> {
    return this.cityService.getAllCities();
  }

  /**
   * Retrieves a city by its ID.
   * @param id - The ID of the city.
   * @returns A promise that resolves to the City object.
   */
  @Get(':id')
  getCityById(@Param('id', CustomParseIntPipe) id: number): Promise<City> {
    return this.cityService.getCityById(id);
  }

  /**
   * Updates a city. Only the admin can update a city.
   * @param id - The ID of the city.
   * @param name - The new name of the city.
   * @returns A promise that resolves to the updated city.
   */
  @Roles(Role.Admin)
  @Put(':id')
  updateCity(
    @Param('id', CustomParseIntPipe) id: number,
    @Body('name') name: string,
  ): Promise<City> {
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
   * Deletes a city. Only the admin can delete a city.
   * @param id - The ID of the city.
   * @returns A promise that resolves to the deleted city.
   */
  @HttpCode(HttpStatus.NO_CONTENT)
  @Roles(Role.Admin)
  @Delete(':id')
  deleteCity(@Param('id', CustomParseIntPipe) id: number) {
    return this.cityService.deleteCity(id);
  }

  /**
   * Retrieves a city by its name.
   * @param name - The name of the city.
   * @returns A promise that resolves to the City object.
   */
  @HttpCode(200)
  @Get('search')
  async getcityBySearch(name: string): Promise<string> {
    try {
      const city = this.cityService.getCityBySearch(name);
      return city;
    } catch (error) {
      console.log(Error);
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }
}

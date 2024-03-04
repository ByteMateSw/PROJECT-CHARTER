import {
  Controller,
  Get,
  Post,
  Body,
  ParseIntPipe,
  Param,
  Delete,
  HttpCode,
  HttpException,
  HttpStatus,
  Patch,
  Query,
} from '@nestjs/common';
import { ProvinceService } from './province.service';
import { CustomParseIntPipe } from '../utils/pipes/parse-int.pipe';
import { Province } from './province.entity';

/**
 * Controller for handling province-related operations.
 */
@Controller('provinces')
export class ProvinceController {
  constructor(private provinceService: ProvinceService) {}

  /**
   * Creates a new province.
   * @param province - The name of the province to be created.
   * @returns A promise that resolves to the created province.
   */
  @Post()
  async createProvince(@Body('name') name: string): Promise<Province> {
    return await this.provinceService.createProvince(name);
  }

  /**
   * Retrieves all provinces.
   * @returns A promise that resolves to an array of Province objects.
   */
  @Get()
  async getProvinces(@Query('name') name: string): Promise<Province[]> {
    console.log(name);
    return await this.provinceService.getProvinces();
  }

  /**
   * Retrieves a province by its ID.
   * @param id - The ID of the province.
   * @returns A promise that resolves to the Province object.
   */
  @Get(':id')
  async getProvinceById(
    @Param('id', CustomParseIntPipe) id: number,
  ): Promise<Province> {
    return await this.provinceService.getProvinceById(id);
  }

  /**
   * Updates a province.
   * @param id - The ID of the province to be updated.
   * @param province - The new name of the province.
   * @returns A promise that resolves to the updated province.
   */
  @HttpCode(HttpStatus.NO_CONTENT)
  @Patch(':id')
  async updateProvince(
    @Param('id', CustomParseIntPipe) id: number,
    @Body('name') name: string,
  ): Promise<void> {
    await this.provinceService.updateProvince(id, name);
  }

  /**
   * Adds a city to a province.
   * @param id - The ID of the province.
   * @param cityId - The ID of the city to be added.
   */
  @Patch('/addCityTo/:id')
  addCity(
    @Param('id', ParseIntPipe) id: number,
    @Body('cityId', ParseIntPipe) cityId: number,
  ) {
    return this.provinceService.addCity(id, cityId);
  }

  /**
   * Deletes a province.
   * @param id - The ID of the province to be deleted.
   */
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async deleteProvince(
    @Param('id', CustomParseIntPipe) id: number,
  ): Promise<void> {
    await this.provinceService.deleteProvince(id);
  }

  /**
   * Retrieves a province by its name.
   * @param name - The name of the province.
   * @returns A promise that resolves to the Province object.
   */
  @HttpCode(200)
  @Get('search')
  async getProvinceBySearch(name: string): Promise<string> {
    try {
      const province = this.provinceService.getProvinceBySearch(name);
      return province;
    } catch (error) {
      console.log(Error);
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }
}

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
import { ProvinceService } from './province.service';

/**
 * Controller for handling province-related operations.
 */
@Controller('province')
export class ProvinceController {
  constructor(private provinceService: ProvinceService) {}

  /**
   * Creates a new province.
   * @param province - The name of the province to be created.
   * @returns A promise that resolves to the created province.
   */
  @Post('/save')
  createProvince(@Body('cityName') cityName: string) {
    return this.provinceService.createProvince(cityName);
  }

  /**
   * Retrieves all provinces.
   * @returns A promise that resolves to an array of Province objects.
   */
  @Get('/list')
  getProvinces() {
    return this.provinceService.getProvinces();
  }

  /**
   * Retrieves a province by its ID.
   * @param id - The ID of the province.
   * @returns A promise that resolves to the Province object.
   */
  @Get('/one/:id')
  getOneProvince(@Param('id', ParseIntPipe) id: number) {
    return this.provinceService.getOneProvince(id);
  }

  /**
   * Updates a province.
   * @param id - The ID of the province to be updated.
   * @param province - The new name of the province.
   * @returns A promise that resolves to the updated province.
   */
  @Put('/update/:id')
  updateProvince(
    @Param('id', ParseIntPipe) id: number,
    @Body('province')
    province: string,
  ) {
    return this.provinceService.updateProvince(id, province);
  }

  /**
   * Adds a city to a province.
   * @param id - The ID of the province.
   * @param cityId - The ID of the city to be added.
   * @returns A promise that resolves to the updated province.
   */
  @Put('/addCityTo/:id')
  addCity(
    @Param('id', ParseIntPipe) id: number,
    @Body('cityId', ParseIntPipe) cityId: number,
  ) {
    return this.provinceService.addCity(id, cityId);
  }

  /**
   * Deletes a province.
   * @param id - The ID of the province to be deleted.
   * @returns A promise that resolves to a message.
   */
  @Delete('/delete/:id')
  deleteProvince(@Param('id', ParseIntPipe) id: number) {
    return this.provinceService.deleteProvince(id);
  }

  /**
   * Retrieves a province by its name.
   * @param name - The name of the province.
   * @returns A promise that resolves to the Province object.
   */
  @HttpCode(200)
  @Get('search')
    async getProvinceBySearch(name:string):Promise<string>{
      try {
        const province = this.provinceService.getProvinceBySearch(name)
        return province
      } catch (error) {
        console.log(Error)
        throw new HttpException(error.message, HttpStatus.NOT_FOUND);   
      }
  }

}

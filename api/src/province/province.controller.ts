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

@Controller('provinces')
export class ProvinceController {
  constructor(private provinceService: ProvinceService) {}

  @Post()
  async createProvince(@Body('name') name: string): Promise<Province> {
    return await this.provinceService.createProvince(name);
  }

  @Get()
  async getProvinces(@Query('name') name: string): Promise<Province[]> {
    console.log(name);
    return await this.provinceService.getProvinces();
  }

  @Get(':id')
  async getProvinceById(
    @Param('id', CustomParseIntPipe) id: number,
  ): Promise<Province> {
    return await this.provinceService.getProvinceById(id);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Patch(':id')
  async updateProvince(
    @Param('id', CustomParseIntPipe) id: number,
    @Body('name') name: string,
  ): Promise<void> {
    await this.provinceService.updateProvince(id, name);
  }

  @Patch('/addCityTo/:id')
  addCity(
    @Param('id', ParseIntPipe) id: number,
    @Body('cityId', ParseIntPipe) cityId: number,
  ) {
    return this.provinceService.addCity(id, cityId);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async deleteProvince(
    @Param('id', CustomParseIntPipe) id: number,
  ): Promise<void> {
    await this.provinceService.deleteProvince(id);
  }

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

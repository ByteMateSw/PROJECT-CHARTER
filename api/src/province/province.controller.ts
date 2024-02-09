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
import { ProvinceService } from './province.service';

@Controller('province')
export class ProvinceController {
  constructor(private provinceService: ProvinceService) {}

  @Post('/save')
  createProvince(@Body('cityName') cityName: string) {
    return this.provinceService.createProvince(cityName);
  }

  @Get('/list')
  getProvinces() {
    return this.provinceService.getProvinces();
  }

  @Get('/one/:id')
  getOneProvince(@Param('id', ParseIntPipe) id: number) {
    return this.provinceService.getOneProvince(id);
  }

  @Put('/update/:id')
  updateProvince(
    @Param('id', ParseIntPipe) id: number,
    @Body('province')
    province: string,
  ) {
    return this.provinceService.updateProvince(id, province);
  }

  @Put('/addCityTo/:id')
  addCity(
    @Param('id', ParseIntPipe) id: number,
    @Body('cityId', ParseIntPipe) cityId: number,
  ) {
    return this.provinceService.addCity(id, cityId);
  }

  @Delete('/delete/:id')
  deleteProvince(@Param('id', ParseIntPipe) id: number) {
    return this.provinceService.deleteProvince(id);
  }
}

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
import { CreateProvinceDto } from './dto/createProvince.dto';
import { UpdateProvinceDto } from './dto/updateProvince.dto';

@Controller('province')
export class ProvinceController {
  constructor(private provinceService: ProvinceService) {}

  @Post('/save')
  createProvinces(@Body() newProvince: CreateProvinceDto) {
    return this.provinceService.createProvince(newProvince);
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
    @Body()
    province: UpdateProvinceDto,
  ) {
    return this.provinceService.updateProvince(id, province);
  }

  @Put('/addCityTo/:id')
  addCity(
    @Param('id', ParseIntPipe) id: number,
    @Body('cityId', ParseIntPipe) cityId: number,
  ) {
    return this.provinceService.updateProvince(id, cityId);
  }

  @Delete('/delete/:id')
  deleteProvince(@Param('id', ParseIntPipe) id: number) {
    return this.provinceService.deleteProvince(id);
  }
}

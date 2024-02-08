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

  @Post('/save')
  createProvinces(@Body() newProvince) {
    return this.cityService.createCity(newProvince);
  }

  @Get('/list')
  getProvinces() {
    return this.cityService.getCity();
  }
  @Get('/one/:id')
  getOneProvince(@Param('id', ParseIntPipe) id: number) {
    return this.cityService.getOneCity(id);
  }

  /*@Post('/listUpload')
  uploadJsonLocalizations() {
    return this.provinceService.uploadJsonLocalizations();
  }*/

  @Put('/update/:id')
  updateProvince(
    @Param('id', ParseIntPipe) id: number,
    @Body()
    province,
  ) {
    return this.cityService.updateCity(id, province);
  }

  @Delete('/delete/:id')
  deleteProvince(@Param('id', ParseIntPipe) id: number) {
    return this.cityService.deleteCity(id);
  }
}

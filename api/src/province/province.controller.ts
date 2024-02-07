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
  createProvinces(@Body() newProvince) {
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
    return this.provinceService.updateProvince(id, province);
  }

  @Delete('/delete/:id')
  deleteProvince(@Param('id', ParseIntPipe) id: number) {
    return this.provinceService.deleteProvince(id);
  }
}

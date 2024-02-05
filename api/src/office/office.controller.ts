import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { OfficeService } from './office.service';
import { Office } from './office.entity';

@Controller('offices')
export class OfficeController {
  constructor(private readonly officeService: OfficeService) {}

  @Get()
  findAll(): Promise<Office[]> {
    return this.officeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Office> {
    return this.officeService.findOne(+id);
  }

  @Post()
  create(@Body() OfficeData: Partial<Office>): Promise<Office> {
    return this.officeService.create(OfficeData);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() OfficeData: Partial<Office>,
  ): Promise<Office> {
    return this.officeService.update(+id, OfficeData);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.officeService.remove(+id);
  }
}

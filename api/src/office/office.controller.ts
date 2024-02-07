import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { OfficeService } from './office.service';
import { Office } from './office.entity';
import {CreateOfficeDto} from './dto/office.dto';

@Controller('offices')
export class OfficeController {
  constructor(private readonly officeService: OfficeService) {}

  @Get()
  async findAll(): Promise<Office[]> {
    try {
      return await this.officeService.findAll();
    } catch (error) {
      throw new Error('Error al buscar todos los oficios');
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Office> {
    try {
      return await this.officeService.findOne(+id);
    } catch (error) {
      throw new Error('Error al buscar el oficio por ID');
    }
  }

  @Post()
  async create(@Body() createOfficeDto: CreateOfficeDto): Promise<Office> {
    try {
      return await this.officeService.createOffice(createOfficeDto);
    } catch (error) {
      throw new Error('Error al crear el oficio');
    }
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateOfficeDto: CreateOfficeDto,
  ): Promise<Office> {
    try {
      return await this.officeService.updateOffice(+id, updateOfficeDto);
    } catch (error) {
      throw new Error('Error al actualizar el oficio');
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    try {
      await this.officeService.removeOffice(+id);
    } catch (error) {
      throw new Error('Error al eliminar el oficio');
    }
  }
}

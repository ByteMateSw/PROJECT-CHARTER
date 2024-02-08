import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpException,
  HttpStatus,
  HttpCode,
  Patch,
} from '@nestjs/common';
import { OfficeService } from './office.service';
import { Office } from './office.entity';
import { CreateOfficeDto } from './dto/office.dto';

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
  @HttpCode(201)
  @Post()
  async createOffice(
    @Body() createOfficeDto: CreateOfficeDto,
  ): Promise<string> {
    try {
      await this.officeService.createOffice(createOfficeDto);
      return 'oficio creado correctamente';
    } catch (error) {
      console.error('Error al crear el oficio', error.message);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Patch(':id')
  async updateOffice(@Body() createOfficeDto: CreateOfficeDto) {
    try {
      await this.officeService.updateOffice(CreateOfficeDto);
      return 'El oficio se ha actualizdo correctamente';
    } catch (error) {
      console.error(
        'El oficio no se ha podido actualizar, error.message, HttpStatus.FORBIDDEN',
      );
    }
  }

  @Delete(':id')
  async deleteOffice(@Param('id') id: number): Promise<string> {
    try {
      await this.officeService.deleteOffice(id);
      return 'eEl oficio ha sido borrado correctamente';
    } catch (error) {
      console.error('El oficio no se ha podido borrar', error.message);
      throw new HttpException(error.message, HttpStatus.FORBIDDEN);
    }
  }
}

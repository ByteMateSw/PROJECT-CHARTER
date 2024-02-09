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
  getAll() {
    throw new Error('Method not implemented.');
  }
  constructor(private readonly officeService: OfficeService) {}

  @Get()
  async findAllOffice(): Promise<Office[]> {
    try {
      return await this.officeService.getAll();
    } catch (error) {
      console.error('Error al buscar todos los oficios', error.message);
      throw new HttpException(
        'Error al buscar todos los oficios',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
async findOne(@Param('id') id: string): Promise<Office> {
  try {
    return await this.officeService.getOfficeById(+id);
  } catch (error) {
    console.error('Error al buscar el oficio por ID', error.message);
    throw new HttpException(
      'Error al buscar el oficio por ID',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
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
  async updateOffice(
    @Param('id') id: number,
    @Body() updateOfficeDto: CreateOfficeDto,
  ) {
    try {
      await this.officeService.updateOffice(id, updateOfficeDto);
      return 'El oficio se ha actualizado correctamente';
    } catch (error) {
      console.error('El oficio no se ha podido actualizar', error.message);
      throw new HttpException(
        'Test Error',
        HttpStatus.FORBIDDEN,
      );
    }
  }
  @Delete(':id')
  async deleteOffice(@Param('id') id: number): Promise<string> {
    try {
      await this.officeService.deleteOffice(id);
      return 'El oficio ha sido borrado correctamente';
    } catch (error) {
      console.error('El oficio no se ha podido borrar', error.message);
      throw new HttpException(error.message, HttpStatus.FORBIDDEN);
    }
  }
}

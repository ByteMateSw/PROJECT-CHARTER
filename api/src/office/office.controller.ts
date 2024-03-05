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
import { ResponseMessage } from 'src/utils/types/functions.type';
import { OfficeDto } from './dto/office.dto';


/**
 * Controller for managing offices.
 */
@Controller('offices')
export class OfficeController {
  constructor(private readonly officeService: OfficeService) {}

  /**
   * Retrieves all offices.
   * @returns A promise that resolves to an array of Office objects.
   * @throws {HttpException} If an error occurs while retrieving the offices.
   */
  @Get()
  async findAllOffice(): Promise<Office[]> {
    try {
      return await this.officeService.getAllOffices();
    } catch (error) {
      throw new HttpException(
        'Error al buscar todos los oficios',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * Retrieves an office by its ID.
   * @param id - The ID of the office to retrieve.
   *
   * @returns A Promise that resolves to the retrieved office.
   * @throws HttpException if there is an error while retrieving the office.
   */
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Office> {
    try {
      return await this.officeService.getOfficeById(+id);
    } catch (error) {
      throw new HttpException(
        'Error al buscar el oficio por ID',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * Creates a new office.
   *
   * @param OfficeDto - The data for creating the office.
   * @returns A string indicating the success of the operation.
   * @throws HttpException if an error occurs during the creation process.
   */
  @HttpCode(201)
  @Post()
  async createOffice(
    @Body() createOfficeDto: CreateOfficeDto,
  ): Promise<string> {
    try {
      await this.officeService.createOffice(OfficeDto);
      return {message:'oficio creado correctamente'};
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * Updates an office with the specified ID.
   *
   * @param id - The ID of the office to update.
   * @param updateOfficeDto - The data to update the office with.
   * @returns A success message if the office is updated successfully.
   * @throws HttpException if an error occurs during the update process.
   */
  @Patch(':id')
  async updateOffice(
    @Param('id') id: number, @Body() updateOfficeDto: OfficeDto): Promise<ResponseMessage> {
    try {
      await this.officeService.updateOffice(id, updateOfficeDto);
      return {message:'El oficio se ha actualizado correctamente'};
    } catch (error) {
      throw new HttpException('Test Error', HttpStatus.FORBIDDEN);
    }
  }

  /**
   * Deletes an office by its ID.
   *
   * @param id - The ID of the office to delete.
   * @returns A promise that resolves to a string indicating the success of the deletion.
   * @throws {HttpException} If an error occurs during the deletion process.
   */
  @Delete(':id')
  async deleteOffice(@Param('id') id: number): Promise<string> {
    try {
      await this.officeService.deleteOffice(id);
      return {message:'El oficio ha sido borrado correctamente'};
    } catch (error) {
      console.error(error.message);
      throw new HttpException(error.message, HttpStatus.FORBIDDEN);
    }
  }

  /**
   * Retrieves an office by searching for its name.
   * @param name - The name of the office to search for.
   * @returns A Promise that resolves to the found office.
   * @throws HttpException with a NOT_FOUND status if the office is not found.
   */
  @HttpCode(200)
  @Get('search')
  async getOfficeBySearch(name: string): Promise<Office> {
    try {
      const office = this.officeService.getOfficeBySearch(name);
      return office;
    } catch (error) {
      console.log(error.message);
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }
}

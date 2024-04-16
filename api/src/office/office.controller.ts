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
import { OfficeDto } from './dto/office.dto';
import { Roles } from '../role/role.decorator';
import { Role } from '../utils/enums/role.enum';
import { CustomParseIntPipe } from 'src/utils/pipes/parse-int.pipe';

/**
 * Controller for managing offices.
 */
@Controller('offices')
export class OfficeController {
  constructor(private officeService: OfficeService) {}

  /**
   * Retrieves all offices.
   * @returns A promise that resolves to an array of Office objects.
   */
  @Get()
  async getAllOffices(): Promise<Office[]> {
    return await this.officeService.getAllOffices();
  }

  /**
   * Retrieves an office by its ID.
   * @param id - The ID of the office to retrieve.
   * @returns A Promise that resolves to the retrieved office.
   */
  @Get(':id')
  async getOfficeById(
    @Param('id', CustomParseIntPipe) id: number,
  ): Promise<Office> {
    return await this.officeService.getOfficeById(id);
  }

  /**
   * Creates a new office. Only users with the Admin role can create offices.
   * @param createOfficeDto - The data for creating the office.
   * @returns A string indicating the success of the operation.
   * @throws HttpException if an error occurs during the creation process.
   */
  @Roles(Role.Admin)
  @Post()
  async createOffice(@Body() createOfficeDto: OfficeDto): Promise<Office> {
    return await this.officeService.createOffice(createOfficeDto);
  }

  /**
   * Updates an office with the specified ID. Only users with the Admin role can update offices.
   * @param id - The ID of the office to update.
   * @param updateOfficeDto - The data to update the office with.
   * @returns A Promise that resolves to the updated office.
   */
  @Roles(Role.Admin)
  @Patch(':id')
  async updateOffice(
    @Param('id', CustomParseIntPipe) id: number,
    @Body() updateOfficeDto: OfficeDto,
  ): Promise<Office> {
    return await this.officeService.updateOffice(id, updateOfficeDto);
  }

  /**
   * Deletes an office by its ID.
   *
   * @param id - The ID of the office to delete.
   */
  @Roles(Role.Admin)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async deleteOffice(
    @Param('id', CustomParseIntPipe) id: number,
  ): Promise<void> {
    await this.officeService.deleteOffice(id);
  }

  @HttpCode(200)
  @Get('search')
  /**
   * Retrieves an office by searching for its name.
   * @param name - The name of the office to search for.
   * @returns A Promise that resolves to the found office.
   * @throws HttpException with a NOT_FOUND status if the office is not found.
   */
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

import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { HiringService } from './hiring.service';

@Controller('hiring')
export class HiringController {
  constructor(private hiringService: HiringService) {}

  @HttpCode(201)
  @Post('save')
  async createHire(@Body() body) {
    try {
      await this.hiringService.createHire(body.contractorId, body.contractedId);
      return 'El contrato ha sido creado correctamente';
    } catch (error) {
      throw new HttpException(error.mesage, HttpStatus.BAD_REQUEST);
    }
  }

  @HttpCode(200)
  @Get(':name')
  async getall() {
    try {
      return await this.hiringService.getAll();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }
}

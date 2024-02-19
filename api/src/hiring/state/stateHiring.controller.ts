import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { StateHiringService } from './stateHiring.service';

@Controller('state')
export class StateHiringController {
  constructor(private stateHiringService: StateHiringService) {}

  @HttpCode(201)
  @Post('save')
  async createStatusHire(@Body() body) {
    try {
      await this.stateHiringService.createStatusHire(body.name);
      return 'El estado del contrato ha sido creado correctamente';
    } catch (error) {
      throw new HttpException(error.mesage, HttpStatus.BAD_REQUEST);
    }
  }

  @HttpCode(200)
  @Get(':name')
  async getStatusByName(@Param('name') name: string) {
    try {
      return await this.stateHiringService.getStatusByName(name);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }
}

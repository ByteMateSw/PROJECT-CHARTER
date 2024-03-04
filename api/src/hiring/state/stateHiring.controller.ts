import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { StateHiringService } from './stateHiring.service';
import { ResponseMessage } from '../../utils/types/functions.type';
import { stateHiringDTO } from './dto/stateHiring.dto';

@Controller('state')
export class StateHiringController {
  constructor(private readonly stateHiringService: StateHiringService) {}

  @HttpCode(201)
  @Post('save')
  async createStatusHire(@Body() stateHiringDTO:stateHiringDTO): Promise<ResponseMessage> {
    try {
      await this.stateHiringService.createStatusHire(stateHiringDTO);
      return { message: 'El estado del contrato ha sido creado correctamente' };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
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
  @HttpCode(200)
  @Delete(':id')
  async deleteStatusHire(@Body('id') id: number): Promise<ResponseMessage>{
    try {
      await this.stateHiringService.deleteStatusHire(id);
      return {message:'se ha eliminado correctamente'};
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.FORBIDDEN);
    }
  }

  @Put(':id')
  async uptadeStatusHire(
    @Param('id') id: number,
    stateHiringDTO:stateHiringDTO
    ,
  ): Promise<ResponseMessage> {
    try {
      await this.stateHiringService.updateStatusHire(id, stateHiringDTO);
      return {message:'El contrato se ha actualizado correctamente'};
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.FORBIDDEN);
    }
  }

  @Get(':name')
  async getAllStateHire() {
    try {
      return await this.stateHiringService.getAllStateHire();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }
}

import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { HiringService } from './hiring.service';
import { UpdateHireDTO } from './uptadeHiring.dto';
import { ResponseMessage } from 'src/utils/types/message.type';

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
  @Get('GetById')
  async getHireById(@Param(':id',ParseIntPipe) id:number){
    try {
      return await this.hiringService.getHireById(id)
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND)
    }
  }
  

  @HttpCode(200)
  @Get(':name')
  async getAllHire() {
    try {
      return await this.hiringService.getAllHire();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @Delete(':id')
  async deleteHire (@Body('id') id:number){
    try {
     await this.hiringService.deleteHire(id)
    } catch (error) {
      console.error ("Error al eliminar el contrato")
    }
  }

  @Put(':id')
  async uptadeHire(@Body ('id') id:number):Promise<ResponseMessage>{
    try {
      await this.hiringService.updateHire(id, UpdateHireDTO)
      return { message: 'El contrato se ha actualizado correctamente' };
  } catch (error) {
      console.error ("Error al actualizar el contrato") 
    }
  }
  
}




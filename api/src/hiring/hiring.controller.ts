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
import { UpdateHireDTO } from './dto/uptadeHiring.dto';
import { ResponseMessage } from '../utils/types/functions.type';
import { CreateHiringDTO } from './dto/createHiring.dto';


@Controller('hiring')
export class HiringController {
  constructor(private hiringService: HiringService) {}

  @HttpCode(201)
  @Post('save')
  async createHire(@Body() createHiringDTO:CreateHiringDTO):Promise<ResponseMessage> {
    try {
      await this.hiringService.createHire(createHiringDTO);
      return {message:'El contrato ha sido creado correctamente'};
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
      throw new HttpException(error.mesage, HttpStatus.BAD_REQUEST);
    }
  }

  @Put(':id')
  async uptadeHire(@Body ('id') id:number, UpdateHireDTO:UpdateHireDTO):Promise<ResponseMessage>{
    try {
      await this.hiringService.updateHire(id, UpdateHireDTO)
      return { message: 'El contrato se ha actualizado correctamente' };
  } catch (error) {
    throw new HttpException(error.mesage, HttpStatus.BAD_REQUEST);
    }
  }
  
}




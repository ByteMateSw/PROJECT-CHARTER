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
import { UpdateStateHireDTO } from './uptadeStateHiring.Dto';
import { ResponseMessage } from 'src/utils/types/functions.type';

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
  @HttpCode(200)
  @Delete(':id')
  async deleteStatusHire(@Body('id') id:number){
    try {
      return await this.stateHiringService.deleteStatusHire(id)      
    } catch (error) {
       console.error ('El estado del contrato no se ha podido borrar')
    }
  }

  @Put(':id')
  async uptadeStateHire(@Body ('id') id:number):Promise<ResponseMessage>{
    try {
      await this.stateHiringService.updateStatusHire(id, UpdateStateHireDTO)
      return { message: 'El contrato se ha actualizado correctamente' };
  } catch (error) {
      console.error ("Error al actualizar el contrato") 
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

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
import { UpdateStateHireDTO } from './uptadeStateHiring.dto';

@Controller('state')
export class StateHiringController {
  constructor(private readonly stateHiringService: StateHiringService) {}

  @HttpCode(201)
  @Post('save')
  async createStatusHire(@Body() body) {
    try {
      await this.stateHiringService.createStatusHire(body.name);
      return 'El estado del contrato ha sido creado correctamente';
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
  async deleteStatusHire(@Body('id') id:number){
    try {
      await this.stateHiringService.deleteStatusHire(id)      
      return "se ha eliminado correctamente"
    } catch (error) {
       throw new HttpException(error.message, HttpStatus.FORBIDDEN)
    }
  }

  @Put(':id')
  async uptadeStatusHire(@Body ('id') id:number, UpdateStateHireDTO: UpdateStateHireDTO):Promise<string>{
    try {
      await this.stateHiringService.updateStatusHire(id, UpdateStateHireDTO)
      return 'El contrato se ha actualizado correctamente' ;
  } catch (error) {
    throw new HttpException(error.message, HttpStatus.FORBIDDEN)
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

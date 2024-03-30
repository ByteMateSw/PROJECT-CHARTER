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
import { UpdateStateHireDTO } from './updateStateHiring.dto';
import { StateHiring } from './stateHiring.entity';
import { CustomParseIntPipe } from 'src/utils/pipes/parse-int.pipe';

@Controller('hirings/states')
export class StateHiringController {
  constructor(private readonly stateHiringService: StateHiringService) {}

  @Post()
  async createStatusHire(@Body('name') name: string): Promise<StateHiring> {
    return await this.stateHiringService.createStatusHire(name);
  }

  @Get(':name')
  async getStatusByName(@Param('name') name: string) {
    try {
      return await this.stateHiringService.getStatusByName(name);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async deleteStatusHire(@Param('id', CustomParseIntPipe) id: number) {
    await this.stateHiringService.deleteStatusHire(id);
  }

  @Put(':id')
  async uptadeStatusHire(
    @Body('id') id: number,
    UpdateStateHireDTO: UpdateStateHireDTO,
  ): Promise<StateHiring> {
    return await this.stateHiringService.updateStatusHire(
      id,
      UpdateStateHireDTO,
    );
  }

  @Get()
  async getAllStateHire(): Promise<StateHiring[]> {
    return await this.stateHiringService.getAllStateHire();
  }
}

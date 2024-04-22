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
import { stateHiringDTO } from './dto/stateHiring.dto';
import { StateHiring } from './stateHiring.entity';
import { CustomParseIntPipe } from 'src/utils/pipes/parse-int.pipe';

@Controller('hirings/states')
export class StateHiringController {
  constructor(private readonly stateHiringService: StateHiringService) {}

  @Post()
  async createStatusHire(@Body() stateHiringDTO:stateHiringDTO): Promise<StateHiring> {
    return await this.stateHiringService.createStatusHire(stateHiringDTO);
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
    stateHiringDTO:stateHiringDTO,
  ): Promise<StateHiring> {
    return await this.stateHiringService.updateStatusHire(
      id,
      stateHiringDTO,
    );
  }

  @Get()
  async getAllStateHire(): Promise<StateHiring[]> {
    return await this.stateHiringService.getAllStateHire();
  }
}

import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { HiringService } from './hiring.service';
import { UpdateHireDTO } from './dto/uptadeHiring.dto';
import { CustomParseIntPipe } from '../utils/pipes/parse-int.pipe';
import { CreateHiringDTO } from './dto/createHiring.dto';
import { Hiring } from './hiring.entity';
import { StateEnum } from './enums/state.enum';

@Controller('hirings')
export class HiringController {
  constructor(private hiringService: HiringService) {}

  @Post()
  async createHiring(@Body() hiring: CreateHiringDTO) {
    await this.hiringService.createHire(hiring);
  }

  @Get(':id')
  async getHiringById(@Param(':id', CustomParseIntPipe) id: number) {
    return await this.hiringService.getHiringById(id);
  }

  @Get()
  async getAllHiring() {
    return await this.hiringService.getAllHire();
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async deleteHiring(@Param('id') id: number): Promise<void> {
    await this.hiringService.deleteHire(id);
  }

  @Patch('state/:id')
  async updateStateHiring(
    @Param('id') id: number,
    @Body('state') state: StateEnum,
  ) {
    return await this.hiringService.updateStateHiring(id, state);
  }

  @Put(':id')
  async uptadeHire(
    @Param('id') id: number,
    updateHiring: UpdateHireDTO,
  ): Promise<Hiring> {
    return await this.hiringService.updateHiring(id, updateHiring);
  }
}

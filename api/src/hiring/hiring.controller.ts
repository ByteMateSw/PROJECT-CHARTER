import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { HiringService } from './hiring.service';
import { UpdateHireDTO } from './Hiring.dto/uptadeHiring.dto';
import { CustomParseIntPipe } from '../utils/pipes/parse-int.pipe';
import { Hiring } from './hiring.entity';

@Controller('hirings')
export class HiringController {
  constructor(private hiringService: HiringService) {}

  @Post()
  async createHiring(@Body() hiring) {
    await this.hiringService.createHiring(hiring);
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

  @Put(':id')
  async uptadeHire(
    @Param('id') id: number,
    updateHiring: UpdateHireDTO,
  ): Promise<Hiring> {
    return await this.hiringService.updateHiring(id, updateHiring);
  }
}

import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { ExperienceService } from './experience.service';
import { CreateExperienceDTO, UpdateExperienceDTO } from './dto/experience.dto';

@Controller('experience')
export class ExperienceController {
  constructor(private experienceService: ExperienceService) {}

  @Post('save')
  async createExperience(@Body() newExperience: CreateExperienceDTO) {
    return await this.experienceService.createExperience(newExperience);
  }

  @Get()
  async getAllExperiences() {
    return await this.experienceService.getAllExperiences();
  }

  @Get(':id')
  async getExperienceById(@Param('id', ParseIntPipe) id: number) {
    return await this.experienceService.getExperienceById(id);
  }

  @Get('user/:id')
  async getExperienceByUserId(@Param('id') id: number) {
    return await this.experienceService.getExperienceByUserId(id);
  }

  @Patch(':id')
  async updateExperience(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateExperience: UpdateExperienceDTO
  ) {
    return await this.experienceService.updateExperience(id, updateExperience);
  }

  @Delete(':id')
  async deleteExperience(@Param('id', ParseIntPipe) id: number) {
    return await this.experienceService.deleteExperience(id);
  }
}

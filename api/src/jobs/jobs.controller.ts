import {
  Post,
  Get,
  Controller,
  Param,
  Body,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { JobsService } from './jobs.service';
import { CreateJobDTO } from './dto/createJob.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';

@Controller('jobs')
export class JobsController {
  constructor(private jobsService: JobsService) {}

  @Post('create')
  @UseInterceptors(FileFieldsInterceptor([{ name: 'img', maxCount: 1 }]))
  async create(
    @Body() data: CreateJobDTO,
    @UploadedFiles()
    files: {
      img: Express.Multer.File[];
    },
  ) {
    //data.img = files.img[0];
    console.log(files[0]);
    return await this.jobsService.create(data);
  }

  @Get(':id')
  async getJobsByUser(@Param('id') userId: number) {
    return await this.jobsService.getJobsByUser(userId);
  }
}

import { Controller } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { CreateJobDTO } from './dto/createJob.dto';

@Controller('jobs')
export class JobsController {
  constructor(private jobsService: JobsService) {}

  async create(data: CreateJobDTO) {
    return await this.jobsService.create(data);
  }

  async getJobsByUser(userId: number) {
    return await this.jobsService.getJobsByUser(userId);
  }
}

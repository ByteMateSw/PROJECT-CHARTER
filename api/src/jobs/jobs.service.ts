import { BadRequestException, Injectable } from '@nestjs/common';
import { JobsRepository } from './repository/jobs.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Jobs } from './jobs.entity';
import { CreateJobDTO } from './dto/createJob.dto';

@Injectable()
export class JobsService {
  constructor(@InjectRepository(Jobs) private jobsRepository: JobsRepository) {}

  async create(data: CreateJobDTO): Promise<Jobs> {
    try {
      const newJob = this.jobsRepository.create(data);
      await this.jobsRepository.save(newJob);
      return newJob;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async getJobsByUser(userId: number): Promise<Jobs[]> {
    try {
      const jobs = await this.jobsRepository.findBy({ user: userId });
      return jobs;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}

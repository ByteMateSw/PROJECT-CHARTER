import { BadRequestException, Injectable } from '@nestjs/common';
import { JobsRepository } from './repository/jobs.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Jobs } from './jobs.entity';
import { CreateJobDTO } from './dto/createJob.dto';
import { S3Service } from 'src/storage/s3.service';

@Injectable()
export class JobsService {
  constructor(
    @InjectRepository(Jobs) private jobsRepository: JobsRepository,
    private s3Service: S3Service,
  ) {}

  async create(data: CreateJobDTO) {
    try {
      const imagePath = await this.s3Service.uploadFile(
        data.img.originalname,
        `jobs/${data.user}`,
        data.img.mimetype,
        data.img.buffer,
      );
      console.log(imagePath);
      //data.img = process.env.R2_PUBLIC_DOMAIN + imagePath;
      //const newJob = this.jobsRepository.create(data);
      //await this.jobsRepository.save(newJob);
      return data;
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

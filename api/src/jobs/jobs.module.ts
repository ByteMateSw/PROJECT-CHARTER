import { Module } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { JobsController } from './jobs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Jobs } from './jobs.entity';
import { S3Module } from 'src/storage/s3.module';

@Module({
  imports: [TypeOrmModule.forFeature([Jobs]), S3Module],
  providers: [JobsService],
  controllers: [JobsController],
})
export class JobsModule {}

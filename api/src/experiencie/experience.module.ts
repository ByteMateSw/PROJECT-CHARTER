import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Experience } from './experience.entity';
import { ExperienceController } from './experience.controller';
import { ExperienceService } from './experience.service';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Experience]), UserModule],
  controllers: [ExperienceController],
  providers: [ExperienceService],
  exports: [ExperienceModule],
})
export class ExperienceModule {}

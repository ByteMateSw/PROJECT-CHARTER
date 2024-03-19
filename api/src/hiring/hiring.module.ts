import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Hiring } from './hiring.entity';
import { HiringService } from './hiring.service';
import { HiringController } from './hiring.controller';
import { UserModule } from '../user/user.module';
import { StateHiringModule } from './state/stateHiring.module';

@Module({
  imports: [TypeOrmModule.forFeature([Hiring]), UserModule, StateHiringModule],
  controllers: [HiringController],
  providers: [HiringService],
})
export class HiringModule {}

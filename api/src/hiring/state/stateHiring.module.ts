import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StateHiring } from './stateHiring.entity';
import { StateHiringController } from './stateHiring.controller';
import { StateHiringService } from './stateHiring.service';

@Module({
  imports: [TypeOrmModule.forFeature([StateHiring])],
  controllers: [StateHiringController],
  providers: [StateHiringService],
  exports: [StateHiringService],
})
export class StateHiringModule {}

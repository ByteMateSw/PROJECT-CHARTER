import { Module } from '@nestjs/common';
import { LocalizationController } from './localization.controller';
import { LocalizationService } from './localization.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Localization])],
  controllers: [LocalizationController],
  providers: [LocalizationService],
})
export class LocalizationModule {}

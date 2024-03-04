import { Module } from '@nestjs/common';
import { ProvinceController } from './province.controller';
import { ProvinceService } from './province.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Province } from './province.entity';
import { City } from '../city/city.entity';

/**
 * Represents the Province module of the application.
 * This module is responsible for importing the necessary dependencies,
 * defining the controllers, providers, and exports for the Province feature.
 */
@Module({
  imports: [TypeOrmModule.forFeature([Province, City])],
  controllers: [ProvinceController],
  providers: [ProvinceService],
})
export class ProvinceModule {}

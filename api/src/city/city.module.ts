import { Module } from '@nestjs/common';
import { CityService } from './city.service';
import { CityController } from './city.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { City } from './city.entity';
import { Province } from '../province/province.entity';
import { User } from '../user/user.entity';

/**
 * Represents the City module of the application.
 * This module is responsible for importing the necessary dependencies,
 * defining the controllers, providers, and exports for the City feature.
 */
@Module({
  imports: [TypeOrmModule.forFeature([City, Province, User])],
  providers: [CityService],
  controllers: [CityController],
  exports: [CityService],
})
export class CityModule {}

import { Module } from '@nestjs/common';
import { CityService } from './city.service';
import { CityController } from './city.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { City } from './city.entity';
import { Province } from '../province/province.entity';
import { User } from '../user/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([City, Province, User])],
  providers: [CityService],
  controllers: [CityController],
})
export class CityModule {}

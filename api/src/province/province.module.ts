import { Module } from '@nestjs/common';
import { ProvinceController } from './province.controller';
import { ProvinceService } from './province.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Province } from './province.entity';
import { City } from 'src/city/city.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Province, City])],
  controllers: [ProvinceController],
  providers: [ProvinceService],
})
export class ProvinceModule {}

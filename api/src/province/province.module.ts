import { Module } from '@nestjs/common';
import { ProvinceController } from './province.controller';
import { ProvinceService } from './province.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Province } from './province.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Province])],
  controllers: [ProvinceController],
  providers: [ProvinceService],
})
export class ProvinceModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Office } from './office.entity';
import { OfficeService } from './office.service';
import { OfficeController } from './office.controller';

/**
 * Module responsible for office-related functionality.
 */
@Module({
  imports: [TypeOrmModule.forFeature([Office])],
  controllers: [OfficeController],
  providers: [OfficeService],
})
export class OfficeModule {}

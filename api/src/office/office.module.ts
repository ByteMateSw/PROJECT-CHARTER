import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Office } from './office.entity';
import { OfficeService } from './office.service';
import { OfficeController } from './office.controller';
import { CategoryModule } from 'src/category/category.module';

/**
 * Module responsible for office-related functionality.
 */
@Module({
  imports: [TypeOrmModule.forFeature([Office]), CategoryModule],
  controllers: [OfficeController],
  providers: [OfficeService],
})
export class OfficeModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Office } from './office.entity';
import { OfficeService } from './office.service';
import { OfficeController } from './office.controller';
import { CategoryModule } from 'src/category/category.module';

/**
 * Represents the Office module of the application.
 * This module is responsible for importing the necessary dependencies,
 * defining the controllers, providers, and exports for the Office feature.
 */
@Module({
  imports: [TypeOrmModule.forFeature([Office]), CategoryModule],
  controllers: [OfficeController],
  providers: [OfficeService],
})
export class OfficeModule {}

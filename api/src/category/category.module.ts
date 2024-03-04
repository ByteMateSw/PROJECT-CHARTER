import { Module } from "@nestjs/common";
import {TypeOrmModule} from '@nestjs/typeorm'
import { CategoryController } from "./category.controller";
import { CategoryService } from "./category.service";
import { Category } from "./category.entity";

/**
 * Represents the Category module of the application.
 * This module is responsible for importing the necessary dependencies,
 * defining the controllers, providers, and exports for the Category feature.
 */
@Module({
    imports: [TypeOrmModule.forFeature([Category])],
    controllers: [CategoryController],
    providers: [CategoryService]
})

export class CategoryModule {}
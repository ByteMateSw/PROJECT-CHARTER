import {
  Body,
  Controller,
  Get,
  Post,
  Param,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { Category } from './Category.entity';

@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}
  @Get()
  getAll(): Promise<Category[]> {
    return this.categoryService.getAll();
  }

  @Get(':id')
  getCategoryById(@Param('id') id: number): Promise<Category> {
    const category = this.categoryService.getById(id);
    return category;
  }

  @Post()
  createCategory(@Body() newCategory) {
    return this.categoryService.create(newCategory);
  }
}

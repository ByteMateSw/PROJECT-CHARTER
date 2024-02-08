import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { Category } from './Category.entity';
import {CreateCategoryDto} from './dto/category.dto';

@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}
  @Get()
  getAll(): Promise<Category[]> {
    return this.categoryService.getAll();
  }

  @Get(':id')
  getById(@Param('id',ParseIntPipe) id: number): Promise<Category> {
    return this.categoryService.getById(id);
  }

  @Post()
  create(@Body() newCategory: CreateCategoryDto ) {
    return this.categoryService.createCategory(newCategory);
  }
}

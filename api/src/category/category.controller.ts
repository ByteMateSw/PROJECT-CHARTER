import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  ParseIntPipe,
  HttpException,
  HttpStatus,
  Patch,
  Delete,
  HttpCode,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { Category } from './category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { updateCategoryDto } from './dto/updateCategory.dto';
import { CustomParseIntPipe } from '../utils/pipes/parse-int.pipe';
import { Roles } from '../role/role.decorator';
import { Role } from '../utils/enums/role.enum';

/**
 * Controller for handling category-related operations.
 */
@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  /**
   * Retrieves all categories.
   * @returns A promise that resolves to an array of categories.
   */
  @Get()
  async getAllCategories(): Promise<Category[]> {
    return await this.categoryService.getAllCategories();
  }

  /**
   * Retrieves a category by its ID.
   *
   * @param id - The ID of the category to retrieve.
   * @returns A Promise that resolves to the retrieved Category object.
   */
  @Get(':id')
  async getCategoryById(
    @Param('id', CustomParseIntPipe) id: number,
  ): Promise<Category> {
    return this.categoryService.getCategoryById(id);
  }

  /**
   * Creates a new category. Only users with the admin role can create categories.
   *
   * @param CreateCategoryDto - The data transfer object containing the category information.
   * @returns A promise that resolves to the created category.
   * @throws If an error occurs while creating the category, an HTTP exception with a bad request status is thrown.
   */
  @Roles(Role.Admin)
  @Post()
  async createCategory(
    @Body() CreateCategoryDto: CreateCategoryDto,
  ): Promise<Category> {
    return await this.categoryService.createCategory(CreateCategoryDto);
  }

  /**
   * Deletes a category by its ID. Only users with the admin role can delete categories.
   *
   * @param id - The ID of the category to delete.
   */
  @Roles(Role.Admin)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async deleteCategory(
    @Param('id', CustomParseIntPipe) id: number,
  ): Promise<void> {
    await this.categoryService.deleteCategory(id);
  }

  /**
   * Updates a category with the specified ID. Only users with the admin role can update categories.
   *
   * @param id - The ID of the category to update.
   * @param updateCategoryDto - The DTO (Data Transfer Object) containing the updated category data.
   * @returns A Promise that resolves to the updated category.
   */
  @Roles(Role.Admin)
  @Patch(':id')
  async updateCategory(
    @Param('id') id: number,
    @Body() updateCategoryDto: updateCategoryDto,
  ): Promise<Category> {
    return await this.categoryService.updateCategory(id, updateCategoryDto);
  }

  /**
   * Retrieves a category by search name.
   * @param name - The search name of the category.
   * @returns A Promise that resolves to a string representing the category.
   * @throws HttpException if an error occurs during the retrieval process.
   */
  @HttpCode(200)
  @Get('search')
  async getCategoryBySearch(name: string): Promise<string> {
    try {
      const Category = this.categoryService.getCategoryBySearch(name);
      return Category;
    } catch (error) {
      console.log(Error);
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }
}

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
import { ResponseMessage } from 'src/utils/types/functions.type';
import { CategoryDto } from './dto/category.dto';


/**
 * Controller for handling category-related operations.
 */
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  /**
   * Retrieves all categories.
   * @returns {Promise<Category[]>} A promise that resolves to an array of categories.
   */
  @Get()
  async getAll() {
    return await this.categoryService.getAllCategories();
  }

  /**
   * Retrieves a category by its ID.
   *
   * @param id - The ID of the category to retrieve.
   * @returns A Promise that resolves to the retrieved Category object.
   * @throws HttpException with a NOT_FOUND status if the category is not found.
   */
  @Get(':id')
  async getById(@Param('id', ParseIntPipe) id: number): Promise<Category> {
    try {
      return this.categoryService.getCategoryById(id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  /**
   * Creates a new category.
   *
   * @param {CreateCategoryDto} CreateCategoryDto - The data transfer object containing the category information.
   * @returns {Promise<string>} A promise that resolves to a success message if the category is created successfully.
   * @throws {HttpException} If an error occurs while creating the category, an HTTP exception with a bad request status is thrown.
   */
  @HttpCode(201)
  @Post()
  async createCategory(
    @Body() CreateCategoryDto: CreateCategoryDto,
  ): Promise<string> {
    try {
      await this.categoryService.createCategory(CreateCategoryDto);
      return 'category creada correctamente';
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * Deletes a category by its ID.
   *
   * @param id - The ID of the category to delete.
   * @returns A promise that resolves to a string indicating the success of the deletion.
   * @throws {HttpException} If an error occurs during the deletion process.
   */
  @Delete(':id')
  async deleteCategory(@Param('id') id: number): Promise<string> {
    try {
      await this.categoryService.deleteCategory(id);
      return 'se ha eliminado correctamente';
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.FORBIDDEN);
    }
  }

  /**
   * Updates a category with the specified ID.
   *
   * @param id - The ID of the category to update.
   * @param updateCategoryDto - The DTO (Data Transfer Object) containing the updated category data.
   * @returns A Promise that resolves to a string indicating the successful update.
   * @throws HttpException if an error occurs during the update process.
   */
  @Patch(':id')
  async updateCategory(
    @Param('id') id: number,
    @Body() updateCategoryDto: updateCategoryDto,
  ): Promise<string> {
    try {
      await this.categoryService.updateCategory(id, updateCategoryDto);
      return 'se ha actualizado correctamente';
    } catch (error) {
      throw new HttpException(error.mesagge, HttpStatus.FORBIDDEN);
    }
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

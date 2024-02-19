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
import { CreateCategoryDto } from './dto/category.dto';
import { updateCategoryDto } from './dto/updateCategory.dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}
  @Get()
  async getAll() {
    return await this.categoryService.getAll();
  }

  @Get(':id')
  getById(@Param('id',ParseIntPipe) id: number): Promise<Category> {
    return this.categoryService.getById(id);
  }

  @HttpCode(201)
  @Post()
  async createCategory(@Body() CreateCategoryDto: CreateCategoryDto ): Promise<string> {
    try{
      await this.categoryService.createCategory(CreateCategoryDto);
      return "category creada correctamente"
    } catch(error){
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
    }
  }

  @Delete(':id')
  async deleteCategory(@Param('id') id: number ): Promise<string>{
    try{
      await this.categoryService.deleteCategory(id)
      return "se ha eliminado correctamente"
    }catch(error){
      throw new HttpException(error.message, HttpStatus.FORBIDDEN)
    }
  }


  @Patch(':id')
  async updateCategory(@Param("id") id:number, @Body() updateCategoryDto: updateCategoryDto): Promise<string>{
    try{
      await this.categoryService.updateCategory(id, updateCategoryDto);
      return "se ha actualizado correctamente"
    }catch(error){
      throw new HttpException(error.mesagge , HttpStatus.FORBIDDEN)
    }
  }

  @HttpCode(200)
  @Get('search')
    async getCategoryBySearch(name:string):Promise<string>{
      try {
        const Category = this.categoryService.getCategoryBySearch(name)
        return Category
      } catch (error) {
        console.log(Error)
        throw new HttpException(error.message, HttpStatus.NOT_FOUND);   
      }
  }



  

}

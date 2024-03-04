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


@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}
  @Get()
  async getAll() {
    return await this.categoryService.getAllCategories();
  }

  @Get(':id')
   async getById(@Param('id',ParseIntPipe) id: number): Promise<Category> {
    try {
      return this.categoryService.getCategoryById(id); 
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND)
    }
  }

  @HttpCode(201)
  @Post()
  async createCategory(@Body() CategoryDto:CategoryDto ): Promise<ResponseMessage> {
    try{
      await this.categoryService.createCategory(CategoryDto);
      return {message:"category creada correctamente"};
    } catch(error){
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
    }
  }

  @Delete(':id')
  async deleteCategory(@Param('id') id: number ): Promise<ResponseMessage>{
    try{
      await this.categoryService.deleteCategory(id)
      return {message:"se ha eliminado correctamente"}
    }catch(error){
      throw new HttpException(error.message, HttpStatus.FORBIDDEN)
    }
  }


  @Patch(':id')
  async updateCategory(@Param("id") id:number, @Body() CategoryDto:CategoryDto): Promise<ResponseMessage>{
    try{
      await this.categoryService.updateCategory(id, CategoryDto);
      return {message:"se ha actualizado correctamente"};
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

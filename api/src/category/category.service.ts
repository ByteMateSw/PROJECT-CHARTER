import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './category.entity';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/category.dto'


@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) { }

  getAll(): Promise<Category[]> {
    return this.categoryRepository.find();
  }

  getById(id: number): Promise<Category> {
    return this.categoryRepository.findOneBy({ id });
  }

  async createCategory(category: CreateCategoryDto): Promise<Category> {
    try {
      const newCategory = this.categoryRepository.create(category);
      return await this.categoryRepository.save(newCategory);
      
    }catch (error) {
      throw new Error("Error al crear la categoría");
    }
  }

  async deleteCategory(id:number): Promise<Category>{
    const category = await this.categoryRepository.findOneBy({ id })
    if(!category)
      throw new Error("La categoria no existe")
    category.isDeleted = true;
    await this.categoryRepository.save(category);
    return category
  }


  async updateCategory(id:number, category): Promise<Category>{
    const categoryFound = await this.categoryRepository.existsBy({ id })
    if (!categoryFound)
      throw new Error("la categoria no existe")
    await this.categoryRepository.update({ id }, category )
    const updateCategory = await this.categoryRepository.findOneBy({id});
    return updateCategory
  }


  async getCategoryBySearch(name:string):Promise<any>{
    try {
        const Categoryname = await this.categoryRepository.findOneBy ({name: name})
        return Categoryname;
    } catch (error) {
      console.log(Error)
      throw new Error ("No se ha encontrado la categoría")
        
    }
    }


}

import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
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
      const existCategory = await this.existName(category.name);
      if(existCategory) throw new BadRequestException('la categoria ya existe')
      const newCategory = await this.categoryRepository.create(category)
    if(!newCategory) throw new BadRequestException('Error al crear categoria')
      const saveCategory = await this.categoryRepository.save(newCategory);
    if(!saveCategory) throw new BadRequestException('Error al guardar la categoria creada')
      return(newCategory)
      
  }

  async existName(name:string): Promise<boolean>{
    return await this.categoryRepository.existsBy({name})
  }

  async deleteCategory(id:number): Promise<Category>{
    const category = await this.categoryRepository.findOneBy({ id })
    if(!category)
      throw new BadRequestException("La categoria no existe")
    category.isDeleted = true;
    const savecategory= await this.categoryRepository.save(category);
    if(!savecategory)throw new BadRequestException('Error al guardar la categoria')
    return savecategory
  }


  async updateCategory(id:number, category): Promise<Category>{
    const categoryFound = await this.categoryRepository.existsBy({ id })
    if (!categoryFound)
      throw new NotFoundException("la categoria no existe")
    const updateCategory = await this.categoryRepository.update({ id }, category )
    if(!updateCategory) 
      throw new BadRequestException('Error al actualizar categoria')
    const findCategory = await this.categoryRepository.findOneBy({id});
      if(!findCategory) throw new NotFoundException('Error al encontrar categoria')
    return findCategory
  }


  async getCategoryBySearch(name:string):Promise<any>{
    const Categoryname = await this.categoryRepository.findOneBy ({name: name})
    if(!Categoryname) throw new NotFoundException("No se ha encontrado la categoría")
    return Categoryname;
        
    }


}

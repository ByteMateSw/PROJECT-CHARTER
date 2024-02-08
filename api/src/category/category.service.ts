import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './Category.entity';
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

  createCategory(category: CreateCategoryDto): string {
    try {
      const existingCategory = this.categoryRepository.findOne({
        where: {
          name: category.name,
        },
      });

      if (existingCategory) {
        throw new HttpException('La categoría ya existe', 400);
      }

      const newCategory = this.categoryRepository.create(category);
      this.categoryRepository.save(newCategory);
      return "Categoría creada correctamente";
    }
    catch (error) {
      console.error("Error al crear la categoría", error.message);
      throw new error("Error al crear la categoría");
    }
  }
}

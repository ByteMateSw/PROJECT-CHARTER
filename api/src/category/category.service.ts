import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './category.entity';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { updateCategoryDto } from './dto/updateCategory.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  /**
   * Retrieves all categories from the category repository.
   * @returns A promise that resolves to an array of Category objects.
   */
  getAllCategories(): Promise<Category[]> {
    return this.categoryRepository.find();
  }

  /**
   * Retrieves a category by its ID.
   * @param id - The ID of the category to retrieve.
   * @returns A Promise that resolves to the retrieved category.
   */
  getCategoryById(id: number): Promise<Category> {
    return this.categoryRepository.findOneBy({ id });
  }

  /**
   * Creates a new category.
   *
   * @param category - The category data to create.
   * @returns A Promise that resolves to the newly created category.
   * @throws ConflictException if the category name already exists.
   */
  async createCategory(category: CreateCategoryDto): Promise<Category> {
    const existCategory = await this.existCategoryName(category.name);
    if (existCategory) throw new ConflictException('La Categoria ya Existe');

    const newCategory = this.categoryRepository.create(category);
    return await this.categoryRepository.save(newCategory);
  }

  /**
   * Checks if a category with the given name exists.
   * @param name - The name of the category to check.
   * @returns A promise that resolves to a boolean indicating whether the category exists.
   */
  async existCategoryName(name: string): Promise<boolean> {
    return await this.categoryRepository.existsBy({ name });
  }

  /**
   * Deletes a category by its ID.
   * @param id - The ID of the category to delete.
   * @returns A promise that resolves to a string indicating the result of the deletion.
   * @throws BadRequestException if the category does not exist.
   */
  async deleteCategory(id: number): Promise<void> {
    const category = await this.categoryRepository.findOneBy({ id });
    if (!category) throw new BadRequestException('La categoria no existe');

    await this.categoryRepository.delete({ id });
  }

  /**
   * Updates a category with the specified ID.
   * @param id - The ID of the category to update.
   * @param updateCategory - The updated category data.
   * @returns A Promise that resolves to the updated category.
   * @throws BadRequestException if the category does not exist.
   */
  async updateCategory(
    id: number,
    updateCategory: updateCategoryDto,
  ): Promise<Category> {
    const category = await this.categoryRepository.findOneBy({ id });
    if (!category) throw new BadRequestException('La categoria no existe');
    return await this.categoryRepository.save({
      ...category,
      ...updateCategory,
    });
  }

  /**
   * Retrieves a category by its name.
   * @param name - The name of the category to search for.
   * @returns A Promise that resolves to the found category.
   * @throws NotFoundException if no category with the specified name is found.
   */
  async getCategoryBySearch(name: string): Promise<any> {
    const Categoryname = await this.categoryRepository.findOneBy({
      name: name,
    });
    if (!Categoryname)
      throw new NotFoundException('No se ha encontrado la categoría');
    return Categoryname;
  }
}

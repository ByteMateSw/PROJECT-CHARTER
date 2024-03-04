import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './category.entity';
import { Repository } from 'typeorm';
import { CategoryDto} from './dto/category.dto';



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
   * @throws BadRequestException if the category name already exists or if there are errors during creation or saving.
   */
  async createCategory(categoria: CategoryDto): Promise<Category> {
    const existCategory = await this.existCategoryName(categoria.name);
    if (existCategory) {
      throw new BadRequestException('La Categoria ya Existe');
    }
    const newCategory = this.categoryRepository.create(categoria);
    if (!newCategory) {
      throw new BadRequestException('Error al crear categoria');
    }
    const saveCategory = await this.categoryRepository.save(newCategory);
    if (!saveCategory) {
      throw new BadRequestException('Error al guardar la categoria creada');
    }
    return saveCategory;
  }

  /**
   * Checks if a category with the given name exists.
   * @param name - The name of the category to check.
   * @returns A promise that resolves to a boolean indicating whether the category exists.
   */
  async existCategoryName(name: string) {
    return await this.categoryRepository.existsBy({ name });
  }

  /**
   * Deletes a category by its ID.
   * @param id - The ID of the category to delete.
   * @returns A promise that resolves to a string indicating the result of the deletion.
   * @throws BadRequestException if the category does not exist.
   */
  async deleteCategory(id: number): Promise<string> {
    const category = await this.categoryRepository.findOneBy({ id });
    if (!category) throw new BadRequestException('La categoria no existe');
    
    await this.categoryRepository.delete({ id });
    return "Categoria eliminada";
  }

  /**
   * Updates a category with the specified ID.
   * @param id - The ID of the category to update.
   * @param category - The updated category data.
   * @returns A Promise that resolves to the updated category.
   * @throws NotFoundException if the category with the specified ID does not exist.
   * @throws BadRequestException if there is an error updating the category.
   */
  async updateCategory(id: number, CategoryDto:CategoryDto): Promise<Category> {
    const categoryFound = await this.categoryRepository.existsBy({ id });
    if (!categoryFound) throw new NotFoundException('la categoria no existe');
    const updateCategory = await this.categoryRepository.update(
      { id },
      CategoryDto,
    );
    if (!updateCategory)
      throw new BadRequestException('Error al actualizar categoria');
    const findCategory = await this.categoryRepository.findOneBy({ id });
    if (!findCategory)
      throw new NotFoundException('Error al encontrar categoria');
    return findCategory;
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

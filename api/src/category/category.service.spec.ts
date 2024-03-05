import { Test, TestingModule } from '@nestjs/testing';
import { CategoryService } from './category.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Category } from './category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';

describe('categoryService', () => {
  let service: CategoryService;

  const mockCategory = {
    id: 1,
    name: 'testName',
    'is deleted': false,
  };

  const mockCategoryRepository = {
    find: jest.fn().mockResolvedValue([mockCategory]),
    findOneBy: jest.fn().mockResolvedValue(mockCategory),
    findOne: jest.fn().mockReturnValue(mockCategory),
    save: jest.fn().mockResolvedValue(mockCategory),
    existsBy: jest.fn().mockResolvedValue(mockCategory),
    create: jest.fn().mockReturnValue(mockCategory),
    update: jest.fn().mockResolvedValue(mockCategory),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoryService,
        {
          provide: getRepositoryToken(Category),
          useValue: mockCategoryRepository,
        },
      ],
    }).compile();

    service = module.get<CategoryService>(CategoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createCategory', () => {
    it('should create an category', async () => {
      jest.spyOn(service, 'existName').mockResolvedValueOnce(false);
      const categoria = await service.createCategory(mockCategory);
      expect(categoria).toMatchObject(mockCategory);
      expect(mockCategoryRepository.create).toHaveBeenCalledWith(mockCategory);
      expect(mockCategoryRepository.save).toHaveBeenCalledWith(mockCategory);
    });
  });

  describe('getAll', () => {
    it('should return and mocked category list', async () => {
      expect(await service.getAll()).toEqual([mockCategory]);
      expect(mockCategoryRepository.find).toHaveBeenCalled();
    });
  });

  describe('getById', () => {
    it('should return an mocked category by id', async () => {
      const id = mockCategory.id;
      expect(await service.getById(id)).toEqual(mockCategory);
      expect(mockCategoryRepository.findOneBy).toHaveBeenCalledWith({ id });
    });
  });

  describe('deleteCategory', () => {
    it('should delete an category', async () => {
      const id = mockCategory.id;
      const mockUpdateCategory = { ...mockCategory, isDeleted: true };

      expect(await service.deleteCategory(id)).toEqual(mockUpdateCategory);
      expect(mockCategoryRepository.findOneBy).toHaveBeenCalledWith({ id });
      expect(mockCategoryRepository.save).toHaveBeenCalledWith(
        mockUpdateCategory,
      );
    });
  });

  it('should thrown an error for non-existingcategory', async () => {
    const id = mockCategory.id;
    mockCategoryRepository.findOneBy.mockResolvedValueOnce(null);
    expect(async () => await service.deleteCategory(id)).rejects.toThrow(
      new Error('La categoria no existe'),
    );
  });

  describe('updeteCategory', () => {
    it('should update an category', async () => {
      const id = mockCategory.id;
      expect(await service.updateCategory(id, mockCategory)).toEqual(
        mockCategory,
      );
      expect(mockCategoryRepository.existsBy).toHaveBeenCalledWith({ id });
      expect(mockCategoryRepository.update).toHaveBeenCalledWith(
        { id },
        mockCategory,
      );
    });

    it('should throw an error for non-existing categorys', async () => {
      const id = mockCategory.id;
      mockCategoryRepository.existsBy.mockReturnValueOnce(false);
      expect(
        async () => await service.updateCategory(id, mockCategory),
      ).rejects.toThrow(new Error('la categoria no existe'));
    });
  });
});

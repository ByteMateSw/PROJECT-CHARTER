import { HttpException, HttpStatus } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateCategoryDto } from './dto/create-category.dto';

describe('CategoryController', () => {
  let controller: CategoryController;

  const mockCategory = {
    id: 1,
    name: 'TestName',
  };

  const mockUpdate = {
    name: 'comercio',
  };

  const mockCreateCategoryDto: CreateCategoryDto = {
    name: 'new category',
  };

  const mockError = new Error('Category error');
  const mockDeletedMessage = 'se ha eliminado correctamente';
  const mockUpdateMessage = 'se ha actualizado correctamente';
  const mockCreateMessage = 'se ha creado correctamente';

  const mockCategoryService = {
    getAll: jest.fn().mockResolvedValue([mockCategory]),
    getById: jest.fn().mockResolvedValueOnce(mockCategory),
    createCategory: jest.fn().mockResolvedValueOnce(mockCreateMessage),
    deleteCategory: jest.fn().mockResolvedValueOnce(mockDeletedMessage),
    updateCategory: jest.fn().mockResolvedValueOnce(mockUpdateMessage),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoryController],
      providers: [CategoryService],
    })
      .overrideProvider(CategoryService)
      .useValue(mockCategoryService)
      .compile();

    controller = module.get<CategoryController>(CategoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAll', () => {
    it('should return an mocked category list', async () => {
      const categorys = await controller.getAll();
      expect(mockCategoryService.getAll).toHaveBeenCalled();
      expect(categorys).toEqual([mockCategory]);
    });

    it('should get an empty category list', async () => {
      const emptyCategoryList = {};
      mockCategoryService.getAll = jest
        .fn()
        .mockResolvedValueOnce(emptyCategoryList);
      expect(await controller.getAll()).toBe(emptyCategoryList);
      expect(mockCategoryService.getAll).toHaveBeenCalled();
    });
  });

  describe('getById', () => {
    it('get an category', async () => {
      const id = mockCategory.id;
      expect(await controller.getById(id)).toBe(mockCategory);
      expect(mockCategoryService.getById).toHaveBeenCalledWith(id);
    });
  });

  describe('create', () => {
    it('should create an category', async () => {
      const result = await controller.createCategory(mockCreateCategoryDto);
      expect(result).toEqual('category creada correctamente');
    });

    it('should throw an error', async () => {
      mockCategoryService.createCategory.mockRejectedValueOnce(mockError);
      await expect(
        async () => await controller.createCategory(mockCreateCategoryDto),
      ).rejects.toThrow(
        new HttpException(mockError.message, HttpStatus.BAD_REQUEST),
      );
    });
  });

  describe('deleteCategory', () => {
    it('delete an category', async () => {
      const id = mockCategory.id;
      expect(await controller.deleteCategory(id)).toEqual(mockDeletedMessage);
    });

    it('should thrown an error', async () => {
      mockCategoryService.deleteCategory.mockRejectedValueOnce(mockError);
      const id = mockCategory.id;
      jest
        .spyOn(mockCategoryService, 'deleteCategory')
        .mockRejectedValueOnce(id);
      await expect(async () => controller.deleteCategory(id)).rejects.toThrow(
        new HttpException(mockError, HttpStatus.FORBIDDEN),
      );
    });
  });

  describe('updateCategory', () => {
    it('update an category', async () => {
      const id = mockCategory.id;
      expect(await controller.updateCategory(id, {})).toEqual(
        mockUpdateMessage,
      );
      expect(mockCategoryService.updateCategory).toHaveBeenCalledWith(id, {});
    }),
      it('should thrown an error', () => {
        const id = mockCategory.id;
        mockCategoryService.updateCategory.mockRejectedValueOnce(id);
        expect(async () => {
          await controller.updateCategory(id, {});
        }).rejects.toThrow(HttpException);
      });
  });
});

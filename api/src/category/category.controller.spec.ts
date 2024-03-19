import { HttpException, HttpStatus } from "@nestjs/common";
import { CategoryController } from "./category.controller"
import { CategoryService } from "./category.service";
import { Test, TestingModule } from "@nestjs/testing";
import { CategoryDto } from "./dto/category.dto";


describe('CategoryController', () => {
    let controller: CategoryController;
    

    const mockCategory = {
        "id": 1,
        "name":"TestName",
    };

    const mockUpdate = {
        "name": "comercio",
    }

    const mockCreateCategoryDto: CategoryDto ={
        name: 'new category',
    }

    const mockError =  new Error('Category error');
    const mockDeletedMessage = {message:'se ha eliminado correctamente'}
    const mockUpdateMessage = {message:'se ha actualizado correctamente'}
    const mockCreateMessage = {message:'Categoria creada correctamente'}

    const mockCategoryService = {
        getAllCategories: jest.fn().mockResolvedValue([mockCategory]),
        getCategoryById: jest.fn().mockResolvedValueOnce(mockCategory),
        createCategory: jest.fn().mockResolvedValueOnce(mockCreateMessage),
        deleteCategory: jest.fn().mockResolvedValueOnce(mockDeletedMessage),
        updateCategory: jest.fn().mockResolvedValueOnce(mockUpdateMessage)
    }
        
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
})

describe('getAllCategories',()=>{
    it('should return an mocked category list', async() =>{
        const categorys= await controller.getAllCategories();
        expect(mockCategoryService.getAllCategories).toHaveBeenCalled();
        expect(categorys).toEqual([mockCategory]);
    });

    it("should get an empty category list", async () => {
        const emptyCategoryList = {};
        mockCategoryService.getAllCategories = jest.fn().mockResolvedValueOnce(emptyCategoryList);
        expect(await controller.getAllCategories()).toBe(emptyCategoryList);
        expect(mockCategoryService.getAllCategories).toHaveBeenCalled();
      });
})

describe('getCategoryById',()=>{
    it('get a category by Id', async() =>{
        const id = mockCategory.id
        expect(await controller.getCategoryById(id)).toBe(mockCategory)
        expect(mockCategoryService.getCategoryById).toHaveBeenCalledWith(id)
    });
    
    it('should throw an error for not get category by Id', async() =>{
        mockCategoryService.getCategoryById.mockRejectedValue(mockError)
        await expect(async () => await controller.getCategoryById(mockCategory.id)
        ).rejects.toThrow(new HttpException(mockError, HttpStatus.BAD_REQUEST))
    })
})

describe('create',()=>{
    it('should create an category', async() =>{
    const result= await controller.createCategory(mockCreateCategoryDto)
    expect(result).toEqual(mockCreateMessage)
});

it('should throw an error', async ()=>{
    mockCategoryService.createCategory.mockRejectedValueOnce(mockError)
    await expect(async () => await controller.createCategory(mockCreateCategoryDto),
    ).rejects.toThrow(
        new HttpException(mockError.message, HttpStatus.BAD_REQUEST),
    )
});
})

describe('deleteCategory',()=>{
    it('delete an category', async() =>{
        const id = mockCategory.id;
        expect(await controller.deleteCategory(id)).toEqual(mockDeletedMessage);
        expect(mockCategoryService.deleteCategory).toHaveBeenCalledWith(id);
    });

    it("should thrown an error", async () =>{
        mockCategoryService.deleteCategory.mockRejectedValueOnce(mockError);
        const id = mockCategory.id;
        jest.spyOn(mockCategoryService,'deleteCategory').mockRejectedValueOnce(id);
        await expect ( async() => controller.deleteCategory(id)).rejects.toThrow(
            new HttpException(mockError, HttpStatus.FORBIDDEN));
    })
})


describe('updateCategory', ()=> {
    it('update an category', async() =>{
    const id = mockCategory.id;
    expect(await controller.updateCategory(id, mockUpdate)).toEqual(mockUpdateMessage);
    expect(mockCategoryService.updateCategory).toHaveBeenCalledWith(id,mockUpdate);
}),
    it("should thrown an error", () =>{
        const id = mockCategory.id;
        mockCategoryService.updateCategory.mockRejectedValueOnce(id);
        expect(async () => {
            await controller.updateCategory(id, mockUpdate)
        }).rejects.toThrow( HttpException);
    })
})

})


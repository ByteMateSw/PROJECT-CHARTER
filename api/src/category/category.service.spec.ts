
import { Test, TestingModule } from "@nestjs/testing";
import { CategoryService } from "./category.service";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Category } from "./category.entity";
import { BadRequestException, NotFoundException } from "@nestjs/common";


describe('categoryService',() =>{
    let service: CategoryService;

    const mockCategory ={
        "id":1,
        "name": "testName",
    }

const mockDeletedMessage = {message:'Categoria eliminada correctamente'}

const mockCategoryRepository ={
    find: jest.fn().mockResolvedValue([mockCategory]),
    findOneBy: jest.fn().mockResolvedValue(mockCategory),
    findOne: jest.fn().mockReturnValue(mockCategory),
    save: jest.fn().mockResolvedValue(mockCategory),
    existsBy: jest.fn().mockResolvedValue(mockCategory),
    create: jest.fn().mockReturnValue(mockCategory),
    update: jest.fn().mockResolvedValue(mockCategory),
    delete: jest.fn().mockResolvedValue(mockCategory)
}

beforeEach(async ()=> {
    const module: TestingModule = await Test.createTestingModule({
    providers: [CategoryService ,{
        provide: getRepositoryToken(Category),
        useValue: mockCategoryRepository
    }]
}).compile();

    service = module.get<CategoryService>(CategoryService);
})

it('should be defined', ()=>{
    expect(service).toBeDefined();
})

describe('getAllCategories',() => {
    it("should return and mocked category list", async ()=>{
        expect(await service.getAllCategories()).toEqual([mockCategory]);
        expect(mockCategoryRepository.find).toHaveBeenCalled()
    });
})

describe('getCategoryById',() => {
    it("should return an mocked category by id", async () =>{
        const id = mockCategory.id;
        expect(await service.getCategoryById(id)).toEqual(mockCategory);
        expect(mockCategoryRepository.findOneBy).toHaveBeenCalledWith({id});
    })
})

describe('createCategory', ()=>{
    it('should create an category', async () => {
        jest.spyOn(service, 'existCategoryName').mockResolvedValueOnce(false);
        const categoria= await service.createCategory(mockCategory);
        expect(categoria).toMatchObject(mockCategory);
        expect(mockCategoryRepository.create).toHaveBeenCalledWith(mockCategory);
        expect(mockCategoryRepository.save).toHaveBeenCalledWith(mockCategory);
    })
    it('should throw an BadRequestException for repeted name', async () => {
        jest.spyOn(service, 'existCategoryName').mockResolvedValueOnce(true);
        await expect(service.createCategory(mockCategory)
        ).rejects.toThrow(new BadRequestException('La Categoria ya existe'));
        expect(service.existCategoryName).toHaveBeenCalledWith(mockCategory.name);
    })


    it('should throw an BadRequestException for not saving category', async () => {
        jest.spyOn(service, 'existCategoryName').mockResolvedValueOnce(false);
        jest.spyOn(mockCategoryRepository, 'create').mockResolvedValueOnce(true);
        jest.spyOn(mockCategoryRepository, 'save').mockResolvedValueOnce(false)
        await expect( service.createCategory(mockCategory)
        ).rejects.toThrow(new BadRequestException('Error al guardar la categoria creada'));
        expect(service.existCategoryName).toHaveBeenCalledWith(mockCategory.name);
        expect(mockCategoryRepository.create).toHaveBeenCalledWith(mockCategory);
        expect(mockCategoryRepository.save).toHaveBeenCalledWith(mockCategory)
    });


})


describe('deleteCategory', ()=>{
    it('should delete an category', async () =>{
        const mockid= mockCategory.id;
        jest.spyOn(mockCategoryRepository, 'findOneBy').mockResolvedValueOnce(mockCategory);
        jest.spyOn(mockCategoryRepository, 'delete').mockResolvedValueOnce(mockCategory);

        const result = await service.deleteCategory(mockid)
        expect(mockCategoryRepository.findOneBy).toHaveBeenCalledWith({id: mockid});
        expect(mockCategoryRepository.delete).toHaveBeenCalledWith({id: mockid})
        expect(result).toEqual(mockDeletedMessage)
    })

    it('should thrown an error for non-existingcategory', async () =>{
        const id= mockCategory.id;
        mockCategoryRepository.findOneBy.mockResolvedValueOnce(null);
        await expect(service.deleteCategory(id)).rejects.toThrow(new NotFoundException('La categoria no existe'));
    })

})

    
describe('updeteCategory', ()=>{
    it('should update an category', async () =>{
        const id= mockCategory.id
        expect(await service.updateCategory(id,mockCategory)).toEqual(mockCategory);
        expect(mockCategoryRepository.existsBy).toHaveBeenCalledWith({id});
        expect(mockCategoryRepository.update).toHaveBeenCalledWith({id},mockCategory);
    })

    it('should throw an error for non-existing categorys',async () =>{
        const id= mockCategory.id;
        mockCategoryRepository.existsBy.mockReturnValueOnce(false);
        await expect(service.updateCategory(id, mockCategory))
            .rejects.toThrow(new NotFoundException('la categoria no existe'));
        expect(mockCategoryRepository.existsBy).toHaveBeenCalledWith({id:id});
    })

    it('should throw an BadRequestException for not updating category',async () =>{
        const id= mockCategory.id;
        mockCategoryRepository.existsBy.mockReturnValueOnce(true);
        jest.spyOn(mockCategoryRepository, 'update').mockResolvedValueOnce(false);
        await expect(service.updateCategory(id, mockCategory))
            .rejects.toThrow(new BadRequestException('Error al actualizar categoria'));
    })

    it('should throw an BadRequestException for not saving category',async () =>{
        const id= mockCategory.id
        mockCategoryRepository.existsBy.mockReturnValueOnce(true);
        mockCategoryRepository.update.mockResolvedValueOnce(true);
        mockCategoryRepository.findOneBy.mockResolvedValueOnce(false);
        await expect(service.updateCategory(id, mockCategory))
            .rejects.toThrow(new BadRequestException('Error al encontrar categoria'));
    })

})

describe('getCategoryBySearch', ()=> {

    it('should get a category by search', async () => {
        const name = mockCategory.name;
        expect(await service.getCategoryBySearch(name)).toEqual(mockCategory);
        expect(await mockCategoryRepository.findOneBy).toHaveBeenCalledWith({name});
    })

    it('should throw an NotFoundException for not getting a category by search', async () => {
        const name = mockCategory.name;
        jest.spyOn(mockCategoryRepository, 'findOneBy').mockResolvedValueOnce(false);
        await expect(service.getCategoryBySearch(name)).rejects.toThrow(new NotFoundException('No se ha encontrado la categoría'));
        expect(mockCategoryRepository.findOneBy).toHaveBeenCalledWith({name});
    })
})


})

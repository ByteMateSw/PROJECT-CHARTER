import { Test, TestingModule } from '@nestjs/testing';
import { OfficeService } from './office.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Office } from './office.entity';

describe('OfficeService', () =>{
    let service: OfficeService;
    const mockOffice = {
        id: 1,
        name: 'Test Office'
    };

    const mockOfficeRepository = {
        create: jest.fn().mockReturnValue(mockOffice),
        save: jest.fn().mockResolvedValue({ ...mockOffice }),
        find: jest.fn().mockResolvedValue([mockOffice]),
        findOne: jest.fn().mockResolvedValue(mockOffice),
        findOneBy: jest.fn().mockResolvedValue(mockOffice),
        update: jest.fn().mockResolvedValue(mockOffice),
        delete: jest.fn().mockResolvedValue(mockOffice),
    };

    beforeEach(async () =>{
        const module: TestingModule= await Test.createTestingModule({
            providers: [
                OfficeService,
                {
                provide: getRepositoryToken(Office),
                useValue: mockOfficeRepository,
            }],
        }).compile();
        service = module.get<OfficeService>(OfficeService);
    });
    it ('should be defined',()=>{
        expect(service).toBeDefined();
    });

    describe('createOffice', () => {
        it('should create a new office record', async () => {
            const newOffice = { name: 'New Office' };
            expect(await service.createOffice(newOffice)).toEqual(mockOffice);
            expect(mockOfficeRepository.create).toHaveBeenCalledWith(newOffice);
            expect(mockOfficeRepository.save).toHaveBeenCalledWith(mockOffice);
        });
    });

    describe('getAll', () => {
        it('should return all office records', async () => {
            expect(await service.getAllOffices()).toEqual([mockOffice]);
            expect(mockOfficeRepository.find).toHaveBeenCalled();
        });
    });

    describe('getOfficeById', () => {
        it('should return an office record by ID', async () => {
            const id = mockOffice.id;
            expect(await service.getOfficeById(id)).toEqual(mockOffice);
            expect(mockOfficeRepository.findOneBy).toHaveBeenCalledWith(id);
        });
    });

    describe('updateOffice', () => {
        it('should update an office record', async () => {
            const id = mockOffice.id;
            const updateOffice = { "name": 'Update Office' };
            const mockSaveOffice = {...mockOffice, ...updateOffice}

            expect(await service.updateOffice(id, updateOffice)).toEqual(mockOffice);
            expect(mockOfficeRepository.findOne).toHaveBeenCalledWith({where: { id }});
            // expect(mockOfficeRepository.update).toHaveBeenCalledWith(id, updateOffice);
            expect(mockOfficeRepository.save).toHaveBeenCalledWith(mockSaveOffice);
        });
    });
    

    describe('deleteOffice', () => {
        it('should delete an office record', async () => {
            const id = mockOffice.id;
            expect(await service.deleteOffice(id)).toEqual(undefined);
            expect(mockOfficeRepository.findOne).toHaveBeenCalledWith({where: {id}});
            expect(mockOfficeRepository.delete).toHaveBeenCalledWith(mockOffice);
        });
    });
});
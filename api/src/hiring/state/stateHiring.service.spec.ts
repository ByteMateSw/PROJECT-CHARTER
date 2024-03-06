import { Test, TestingModule } from "@nestjs/testing"
import { StateHiringService } from "./stateHiring.service"
import { getRepositoryToken } from "@nestjs/typeorm"
import { StateHiring } from "./stateHiring.entity"
import { BadRequestException, NotFoundException } from "@nestjs/common"
import { stateHiringDTO } from "./dto/stateHiring.dto"


describe('stateHiringService', () =>{
    let service: StateHiringService
    
    const mockStateHiring = {
        "id": 1,
        "name": "test",
        "hiring": []
    }

    const mockStateHiringRepository = {
        save: jest.fn().mockResolvedValue([mockStateHiring]),
        findOneBy: jest.fn().mockResolvedValue(mockStateHiring),
        delete: jest.fn().mockResolvedValue(mockStateHiring),
        update: jest.fn().mockResolvedValue(mockStateHiring),
        create: jest.fn().mockReturnValue(mockStateHiring),
        findOneByOrFail: jest.fn().mockResolvedValue(mockStateHiring),
        find: jest.fn().mockResolvedValue(mockStateHiring),
        getStatusByName: jest.fn().mockResolvedValue(mockStateHiring)
    };

    beforeEach(async () =>{
        const module: TestingModule = await Test.createTestingModule({
            providers: [StateHiringService, {
                provide: getRepositoryToken(StateHiring),
                useValue: mockStateHiringRepository
            }]
        }).compile();

        service = module.get<StateHiringService>(StateHiringService);
    });
    
    it('should be defined', () =>{
        expect(service).toBeDefined();
    });

    describe('createStatusHire', () => {
        it('should create an status hire', async () =>{
            const mockSaveStatus= {...mockStateHiring};
            jest.spyOn(service, 'getStatusByName').mockResolvedValueOnce(null);
            jest.spyOn(mockStateHiringRepository, 'save').mockResolvedValueOnce(mockStateHiring);
            await service.createStatusHire(mockStateHiring);
            expect(mockStateHiringRepository.create).toHaveBeenCalledWith(mockStateHiring);
            expect(mockStateHiringRepository.save).toHaveBeenCalledWith(mockSaveStatus);
            
        });

        it('should throw an error for a repeated name of status hire', async () =>{
            const existingName= 'test';
            jest.spyOn(service, 'getStatusByName').mockResolvedValueOnce(mockStateHiring);
            await expect(async () => await service.createStatusHire(mockStateHiring),
            ).rejects.toThrow(new BadRequestException('Error ya existe un estado con ese nombre'));
            expect(service.getStatusByName).toHaveBeenCalledWith(existingName);
        })

        it('should return an error for not saved status hire', async() =>{
            jest.spyOn(service, 'getStatusByName').mockResolvedValueOnce(null);
            jest.spyOn(mockStateHiringRepository, 'create').mockResolvedValueOnce(true);
            jest.spyOn(mockStateHiringRepository, 'save').mockResolvedValueOnce(false)
            await expect(service.createStatusHire(mockStateHiring)).rejects.toThrow(
              new BadRequestException('Error al guardar estado de contrato'),
            );

        })
    })

       
    describe('getStatusByName', () =>{
        it('should get an status by name', async () =>{
            jest.spyOn(mockStateHiringRepository, 'findOneBy').mockResolvedValueOnce(mockStateHiring);
            const result = await service.getStatusByName(mockStateHiring.name);
            expect(mockStateHiringRepository.findOneBy).toHaveBeenCalledWith({name:mockStateHiring.name});
            expect(result).toEqual(mockStateHiring);
        })

        it('should throw an error for not finding status', async() =>{
            mockStateHiringRepository.findOneBy.mockResolvedValueOnce(null);
            await expect(service.getStatusByName(mockStateHiring.name)).rejects.toThrow(new NotFoundException('Nombre incorrecto'));
            expect(mockStateHiringRepository.findOneBy).toHaveBeenCalledWith({name:mockStateHiring.name});
        })
    })

    describe('deleteStatusHire', () =>{
        it('should delete an status Hire', async () =>{
            const mockId = mockStateHiring.id;
            jest.spyOn(mockStateHiringRepository, 'findOneBy').mockResolvedValueOnce(mockStateHiring);
            jest.spyOn(mockStateHiringRepository, 'delete').mockResolvedValueOnce(mockStateHiring);

            const result = await service.deleteStatusHire(mockId)

            expect(mockStateHiringRepository.findOneBy).toHaveBeenCalledWith({id:mockId});
            expect(mockStateHiringRepository.delete).toHaveBeenCalledWith(mockId);
            expect(result).toEqual({message:'El estado del contrato se ha borrado correctamente'});
        })

        it('should throw an error for not existing status hire', async () =>{
            const mockid = mockStateHiring.id;
            jest.spyOn(mockStateHiringRepository, 'findOneBy').mockResolvedValueOnce(false);
            await expect(service.deleteStatusHire(mockid),
            ).rejects.toThrow(new NotFoundException('El estado del contrato no existe'));
            expect(mockStateHiringRepository.findOneBy).toHaveBeenCalledWith({id: mockid});
        })

        it('should throw an error for not deleting status hire', async () =>{
            const mockid = mockStateHiring.id;
            jest.spyOn(mockStateHiringRepository, 'findOneBy').mockResolvedValueOnce(true);
            jest.spyOn(mockStateHiringRepository, 'delete').mockResolvedValueOnce(false);
            await expect(service.deleteStatusHire(mockid),
            ).rejects.toThrow(new BadRequestException('Error al eliminar el estado'));
            expect(mockStateHiringRepository.findOneBy).toHaveBeenCalledWith({id: mockid});
            expect(mockStateHiringRepository.delete).toHaveBeenCalledWith(mockid);
        })

    })


    describe('updateStatusHire', () => {
        it('should update a status Hire', async () =>{
            const mockId = mockStateHiring.id;
            const mockUpdateStateDto= stateHiringDTO;
            const mockUpdatedState = {
                "id":"1",
                "name":"updatedTest",
                "hiring":[]
            };
            jest.spyOn(mockStateHiringRepository, 'findOneBy').mockResolvedValueOnce(mockStateHiring);
            jest.spyOn(mockStateHiringRepository, 'update').mockResolvedValueOnce(mockStateHiring);
            jest.spyOn(mockStateHiringRepository, 'findOneByOrFail').mockResolvedValueOnce(mockUpdatedState);

            const result = await service.updateStatusHire(mockId, mockUpdateStateDto);

            expect(mockStateHiringRepository.findOneBy).toHaveBeenCalledWith({id:mockId});
            expect(mockStateHiringRepository.update).toHaveBeenCalledWith(mockId, mockUpdateStateDto);
            expect(result).toEqual(mockUpdatedState)
        });

        it('should throw an error for not existing status Hire', async () =>{
            const mockId = mockStateHiring.id;
            const mockUpdateStateDto= stateHiringDTO;
            jest.spyOn(mockStateHiringRepository,'findOneBy').mockResolvedValueOnce(false);

            await expect(service.updateStatusHire(mockId, mockUpdateStateDto),
            ).rejects.toThrow(new NotFoundException('El estado del contrato no existe'));
            expect(mockStateHiringRepository.findOneBy).toHaveBeenCalledWith({id:mockId});

        })

        it('should throw an error for not updating the status Hire', async () =>{
            const mockId = mockStateHiring.id;
            const mockUpdateStateDto= stateHiringDTO;
            jest.spyOn(mockStateHiringRepository,'findOneBy').mockResolvedValueOnce(true);
            jest.spyOn(mockStateHiringRepository,'update').mockResolvedValueOnce(false)
            await expect(service.updateStatusHire(mockId, mockUpdateStateDto),
            ).rejects.toThrow(new BadRequestException('Error al actualizar el estado de contrato'));
            expect(mockStateHiringRepository.findOneBy).toHaveBeenCalledWith({id:mockId});
            expect(mockStateHiringRepository.delete).toHaveBeenCalledWith(mockId)
        })

        it('should throw an error for not finding the status', async () =>{
            const mockId = mockStateHiring.id;
            const mockUpdateStateDto= stateHiringDTO;
            jest.spyOn(mockStateHiringRepository,'findOneBy').mockResolvedValueOnce(true);
            jest.spyOn(mockStateHiringRepository,'update').mockResolvedValueOnce(true)
            jest.spyOn(mockStateHiringRepository,'findOneByOrFail').mockResolvedValueOnce(false)
            await expect(service.updateStatusHire(mockId, mockUpdateStateDto),
            ).rejects.toThrow(new NotFoundException('Error al encontrar estado'));
            expect(mockStateHiringRepository.findOneBy).toHaveBeenCalledWith({id:mockId});
            expect(mockStateHiringRepository.delete).toHaveBeenCalledWith(mockId)
            expect(mockStateHiringRepository.findOneByOrFail).toHaveBeenCalledWith({id:mockId})
        })

    })


    describe('getAllStateHire',  () =>{
        it('should return all state hires', async () =>{
            expect(await service.getAllStateHire()).toEqual(mockStateHiring);
            expect(mockStateHiringRepository.find).toHaveBeenCalled();
        })

        it('should throw an error fot not bringing all the states', async () =>{
            jest.spyOn(mockStateHiringRepository, 'find').mockRejectedValueOnce(
                new Error('Error al traer todos los estados del contrato'));
            await expect(service.getAllStateHire()).rejects.toThrow(new Error('Error al traer todos los estados del contrato'));
            expect(mockStateHiringRepository.find).toHaveBeenCalledWith();
        })
    })

})
import { Test, TestingModule } from "@nestjs/testing"
import { StateHiringService } from "./stateHiring.service"
import { getRepositoryToken } from "@nestjs/typeorm"
import { StateHiring } from "./stateHiring.entity"
import { UpdateStateHireDTO } from "./updateStateHiring.dto"
import { mock } from "node:test"



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
        findOneByOrFail: jest.fn().mockResolvedValue(mockStateHiring),
        find: jest.fn().mockResolvedValue(mockStateHiring),
        getStatusByName: jest.fn().mockResolvedValue(mockStateHiring)
    }

    beforeEach(async () =>{
        const module: TestingModule = await Test.createTestingModule({
            providers: [StateHiringService, {
                provide: getRepositoryToken(StateHiring),
                useValue: mockStateHiringRepository
            }]
        }).compile();

        service = module.get<StateHiringService>(StateHiringService)
    });
    
    it('should be defined', () =>{
        expect(service).toBeDefined();
    });

    describe('createStatusHire', () => {
        it('should create an status hire', async () =>{
            const mocksaveStatus= {"name": "test"}

            jest.spyOn(service, 'getStatusByName').mockResolvedValueOnce(null);
            jest.spyOn(mockStateHiringRepository, 'save').mockResolvedValueOnce(mockStateHiring);
            expect(await service.createStatusHire(mockStateHiring.name)).toEqual(undefined);
            expect(service.getStatusByName).toHaveBeenCalledWith(mockStateHiring.name);
            expect(mockStateHiringRepository.save).toHaveBeenCalledWith(mocksaveStatus);
        });

        it('should throw an error for repeated name Status', async () => {
            jest.spyOn(service, 'getStatusByName').mockResolvedValueOnce(mockStateHiring);
            await expect(service.createStatusHire(mockStateHiring.name)).rejects.toThrow(
              new Error('Error al crear el estado'),
            );
            expect(service.getStatusByName).toHaveBeenCalledWith(mockStateHiring.name);
          });

        /*it('should return an error for a repeted name of state', async() =>{
            const existingName= 'test'
            jest.spyOn(service, 'getStatusByName').mockResolvedValueOnce({id:1, name:existingName, hiring:[]});
            expect(service.getStatusByName).toHaveBeenCalledWith(existingName)
            expect(async () => await service.createStatusHire(existingName)).rejects.toThrow(
              new Error('Error ya existe un estado con ese nombre'),
            );
            
        })*/

        /*it('should return an error for non created status', async() => {
            const newName = 'newtest'
            jest.spyOn(service, 'getStatusByName').mockResolvedValueOnce(null)
            await expect(service.createStatusHire(newName)).rejects.toThrow(
                new Error('Error al crear el estado'));
            expect(service.getStatusByName).toHaveBeenCalledWith(newName)
        });*/

        it('should throw an error for non created status', async () =>{
            const mockname = mockStateHiring.name;
            jest.spyOn(service, 'getStatusByName').mockResolvedValueOnce(null);
            await expect(service.createStatusHire(mockname)
            ).rejects.toThrow(new Error('Error al crear el estado'));
            expect(mockStateHiringRepository.getStatusByName).toHaveBeenCalledWith({name: mockname});
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
            jest.spyOn(mockStateHiringRepository, 'findOneBy').mockRejectedValueOnce(new Error('error'));
            await expect(service.getStatusByName(mockStateHiring.name)).rejects.toThrow(new Error('Error al encontrar el status'));
            expect(mockStateHiringRepository.findOneBy).toHaveBeenCalledWith({name:mockStateHiring.name});
        })
    })

    describe('deleteStatusHire', () =>{
        it('should delete an status Hire', async () =>{
            const mockId = mockStateHiring.id;
            jest.spyOn(mockStateHiringRepository, 'findOneBy').mockResolvedValueOnce(mockStateHiring);
            jest.spyOn(mockStateHiringRepository, 'delete').mockResolvedValueOnce(undefined);

            const result = await service.deleteStatusHire(mockId)

            expect(mockStateHiringRepository.findOneBy).toHaveBeenCalledWith({id:mockId});
            expect(mockStateHiringRepository.delete).toHaveBeenCalledWith(mockId);
            expect(result).toEqual({message:'El estado del contrato se ha borrado correctamente'});
        })

        it('should throw an error for not deleting status hire', async () =>{
            const mockid = mockStateHiring.id;
            jest.spyOn(mockStateHiringRepository, 'findOneBy').mockResolvedValueOnce(false);
            await expect(service.deleteStatusHire(mockid),
            ).rejects.toThrow(new Error('Error al borrar el contrato'));
            expect(mockStateHiringRepository.findOneBy).toHaveBeenCalledWith({id: mockid});
        })

    })


    describe('updateStatusHire', () => {
        it('should update a status Hire', async () =>{
            const mockId = mockStateHiring.id;
            const mockUpdateStateDto= UpdateStateHireDTO;
            const mockUpdatedState = {
                "id":"1",
                "name":"updatedTest",
                "hiring":[]
            };
            jest.spyOn(mockStateHiringRepository, 'findOneBy').mockResolvedValueOnce(mockStateHiring);
            jest.spyOn(mockStateHiringRepository, 'update').mockResolvedValueOnce(undefined);
            jest.spyOn(mockStateHiringRepository, 'findOneByOrFail').mockResolvedValueOnce(mockUpdatedState);

            const result = await service.updateStatusHire(mockId, mockUpdateStateDto);

            expect(mockStateHiringRepository.findOneBy).toHaveBeenCalledWith({id:mockId});
            expect(mockStateHiringRepository.update).toHaveBeenCalledWith(mockId, mockUpdateStateDto);
            expect(result).toEqual(mockUpdatedState)
        });

        it('should throw an error for not updating the status Hire', async () =>{
            const mockId = mockStateHiring.id;
            const mockUpdateStateDto= UpdateStateHireDTO;
            jest.spyOn(mockStateHiringRepository,'findOneBy').mockResolvedValueOnce(false);

            await expect(service.updateStatusHire(mockId, mockUpdateStateDto),
            ).rejects.toThrow(new Error('Error al actualizar el contrato'));
            expect(mockStateHiringRepository.findOneBy).toHaveBeenCalledWith({id:mockId});

        })
    })


    describe('getAllStateHire',  () =>{
        it('should return all state hires', async () =>{
            expect(await service.getAllStateHire()).toEqual(mockStateHiring);
            expect(mockStateHiringRepository.find).toHaveBeenCalled();
        })

        it('should throw an error if bringing all the status hire', async () =>{
            jest.spyOn(mockStateHiringRepository, 'find').mockRejectedValueOnce(
                new Error('Error al traer todos los estados del contrato'));
            await expect(service.getAllStateHire()).rejects.toThrow(new Error('Error al traer todos los estados del contrato'));
            expect(mockStateHiringRepository.find).toHaveBeenCalledWith();
        })
    })

})
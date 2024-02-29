import { Test, TestingModule } from "@nestjs/testing";
import { StateHiringController } from "./stateHiring.controller";
import { StateHiringService } from "./stateHiring.service";
import { HttpException, HttpStatus } from "@nestjs/common";

describe('stateHiring', () =>{
    let controller : StateHiringController;

    const mockStateHiring = {
        "id": 1,
        "name": "Test"
    };

    const mockCreateMessage = 'El estado del contrato ha sido creado correctamente'
    const mockDeleteMessage = 'se ha eliminado correctamente'
    const mockUpdateMessage = 'El contrato se ha actualizado correctamente'
    const mockError = new Error('state error');

    const mockStateHiringService = {        
        createStatusHire: jest.fn().mockResolvedValueOnce(mockCreateMessage),
        getStatusByName: jest.fn().mockResolvedValue([mockStateHiring]),
        deleteStatusHire: jest.fn().mockResolvedValue(mockDeleteMessage),
        updateStatusHire: jest.fn().mockResolvedValue(mockUpdateMessage),
        getAllStateHire: jest.fn().mockResolvedValue([mockStateHiring])

    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [StateHiringController],
            providers: [StateHiringService],
        })

        .overrideProvider(StateHiringService)
        .useValue(mockStateHiringService)
        .compile()

        controller = module.get<StateHiringController>(StateHiringController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined()
    })

    describe('getAllStateHire', () =>{
        it('should return an mocked status list', async() =>{
            mockStateHiringService.getAllStateHire.mockResolvedValue([mockStateHiring])
            const states = await controller.getAllStateHire()
            expect(mockStateHiringService.getAllStateHire).toHaveBeenCalled()
            expect(states).toEqual([mockStateHiring])
            
        });

        it('should get an empty states list', async ()=>{
            const emptyStatesList = {}
            mockStateHiringService.getAllStateHire = jest.fn().mockResolvedValueOnce(emptyStatesList);
            expect(await controller.getAllStateHire()).toBe(emptyStatesList);
            expect(mockStateHiringService.getAllStateHire).toHaveBeenCalledWith();
        });
    })

    describe('createStatushire', () =>{
        it('should create an status hire', async() =>{
            const mockRequestBody= {name: 'newStatus'}
            const result = await controller.createStatusHire(mockRequestBody)
            expect(result).toEqual('El estado del contrato ha sido creado correctamente')
        });

        it('should throw an error', async ()=>{
            const mockRequestBody= {name: 'newStatus'}
            mockStateHiringService.createStatusHire.mockRejectedValueOnce(mockError)
            await expect(async () => await controller.createStatusHire(mockRequestBody),
            ).rejects.toThrow(
                new HttpException(mockError.message, HttpStatus.BAD_REQUEST)
            )
        })
    })

    describe('getStatusByName', () =>{
        it('should get an status by name', async() =>{
            const result = await controller.getStatusByName(mockStateHiring.name)
            expect(mockStateHiringService.getStatusByName).toHaveBeenCalledWith(mockStateHiring.name)
            expect(result).toEqual([mockStateHiring])
        })

    })

    describe('deleteStatusHire', () =>{
        it('should delete an status Hire', async() =>  {
            const id = mockStateHiring.id
            expect(await controller.deleteStatusHire(id)).toEqual(mockDeleteMessage)
        });

        it('should thrown an error for non-deleted status hire', async () =>{
            mockStateHiringService.deleteStatusHire.mockRejectedValueOnce(mockError)
            const id = mockStateHiring.id
            jest.spyOn(mockStateHiringService, 'deleteStatusHire').mockRejectedValueOnce(id)
            await expect (async() => controller.deleteStatusHire(id)).rejects.toThrow(
                new HttpException(mockError, HttpStatus.FORBIDDEN)
            )
        })
    })


    describe('UpdateStatusHire', () =>{
        it('should update an state hire', async() => {
            const id= mockStateHiring.id
            const mockUpdateStateHireDTO = {
                name : "test"
            }
            expect(await controller.uptadeStatusHire(id,mockUpdateStateHireDTO)).toEqual(mockUpdateMessage)
            expect(mockStateHiringService.updateStatusHire).toHaveBeenCalledWith(id,mockUpdateStateHireDTO)
        })

        it('should thrown an error for non-update state Hire', async()=>{
            const id = mockStateHiring.id
            const mockUpdateStateHireDTO = {
                name : "test"
            }
            mockStateHiringService.updateStatusHire.mockRejectedValueOnce(id)
            expect(async () => {
                await controller.uptadeStatusHire(id,mockUpdateStateHireDTO)
            }).rejects.toThrow(HttpException)
        })
    })

})
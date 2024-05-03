import { Test, TestingModule } from '@nestjs/testing';
import { OfficeController } from './office.controller';
import { OfficeService } from './office.service';
import { HttpException } from '@nestjs/common';
import { OfficeDto } from './dto/office.dto';
import { HttpStatus } from '@nestjs/common';

describe('OfficeController', () => {
  let controller: OfficeController;

  const mockOffice = {
    id: 1,
    name: 'Office 1',
  };

  const mockCreateOfficeDto: OfficeDto = {
    name: 'New Office',
  };

  const mockError = new Error('Test Error');

  const mockCreateMessage = 'El Oficio ha sido creado correctamente';

  const mockDeleteMessage = 'El Oficio ha sido borrado correctamente';

  const mockUpdateMessage = 'El Oficio se ha actualizado correctamente';

  const mockOfficeService = {
    findAllOffice: jest.fn().mockResolvedValue([mockOffice]),
    findOne: jest.fn().mockResolvedValue(mockOffice),
    getOfficeById: jest.fn().mockResolvedValue(mockOffice),
    getAll: jest.fn().mockResolvedValue([mockOffice]),
    createOffice: jest.fn().mockResolvedValue(mockCreateMessage),
    deleteOffice: jest.fn().mockResolvedValue(mockDeleteMessage),
    updateOffice: jest.fn().mockResolvedValue(mockUpdateMessage),
  } as any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OfficeController],
      providers: [OfficeService],
    })
      .overrideProvider(OfficeService)
      .useValue(mockOfficeService)
      .compile();

    controller = module.get<OfficeController>(OfficeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  describe('findAllOffice', () => {
    it('should return all offices', async () => {
      const offices = await controller.getAllOffices();
      expect(offices).toEqual([mockOffice]);
    });

    it('should throw an error when officeService throws an error', async () => {
      mockOfficeService.getAll.mockRejectedValueOnce();
      await expect(
        async () => await controller.getAllOffices(),
      ).rejects.toThrow(
        new HttpException(
          'Error al buscar todos los oficios',
          HttpStatus.INTERNAL_SERVER_ERROR,
        ),
      );
    });
  });
  describe('createOffice', () => {
    it('should create a new office', async () => {
      const result = await controller.createOffice(mockCreateOfficeDto);
      expect(result).toEqual('oficio creado correctamente');
    });

    it('should throw an HttpException with HttpStatus.BAD_REQUEST when officeService throws an error', async () => {
      mockOfficeService.createOffice.mockRejectedValueOnce(mockError);
      await expect(
        async () => await controller.createOffice(mockCreateOfficeDto),
      ).rejects.toThrow(
        new HttpException(mockError.message, HttpStatus.BAD_REQUEST),
      );
    });
  });

  describe('findOne', () => {
    it('should return the office with the specified ID', async () => {
      const mockOffice = { id: 1, name: 'Office 1' };
      const result = await controller.getOfficeById(1);
      expect(result).toEqual(mockOffice);
    });

    it('should throw an HttpException with HttpStatus.INTERNAL_SERVER_ERROR when officeService throws an error', async () => {
      mockOfficeService.getOfficeById.mockRejectedValueOnce(mockError);
      await expect(
        async () => await controller.getOfficeById(1),
      ).rejects.toThrow(
        new HttpException(
          'Error al buscar el oficio por ID',
          HttpStatus.INTERNAL_SERVER_ERROR,
        ),
      );
    });
  });

  describe('deleteOffice', () => {
    it('should delete the office with the specified ID', async () => {
      const id = 1;
      const result = await controller.deleteOffice(id);
      expect(result).toEqual('El oficio ha sido borrado correctamente');
    });

    it('should throw an HttpException with HttpStatus.FORBIDDEN when officeService throws an error', async () => {
      mockOfficeService.deleteOffice.mockRejectedValueOnce(mockError);
      const id = 1;
      await expect(
        async () => await controller.deleteOffice(id),
      ).rejects.toThrow(
        new HttpException(mockError.message, HttpStatus.FORBIDDEN),
      );
    });
  });

  describe('updateOffice', () => {
    it('should update the office with the specified ID', async () => {
      const id = 1;
      const result = await controller.updateOffice(id, mockCreateOfficeDto);
      expect(result).toBe('El oficio se ha actualizado correctamente');
    });

    it('should throw an HttpException with HttpStatus.FORBIDDEN when officeService throws an error', async () => {
      mockOfficeService.updateOffice.mockRejectedValueOnce(mockError);
      const id = 1;
      await expect(
        async () => await controller.updateOffice(id, mockCreateOfficeDto),
      ).rejects.toThrow(
        new HttpException(mockError.message, HttpStatus.FORBIDDEN),
      );
    });
  });
});

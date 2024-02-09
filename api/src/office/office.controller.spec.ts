import { Test, TestingModule } from '@nestjs/testing';
import { OfficeController } from './office.controller';
import { OfficeService } from './office.service';
import { HttpException } from '@nestjs/common';
import { CreateOfficeDto } from './dto/office.dto';
import { HttpStatus } from '@nestjs/common';

describe('OfficeController', () => {
  let controller: OfficeController;

  const mockOffice = {
    id: 1,
    name: 'Office 1',
  };

  const mockCreateOfficeDto: CreateOfficeDto = {
    name: 'New Office',
  };

  const mockError = new Error('Test Error');

  const mockCreateMessage = 'El Oficio ha sido creado correctamente';

  const mockDeleteMessage = 'El Oficio ha sido borrado correctamente';

  const mockUpdateMessage = 'El Oficio se ha actualizado correctamente';

  const mockOfficeService = {
    findAllOffice: jest.fn().mockResolvedValueOnce([mockOffice]),
    findOne: jest.fn().mockResolvedValueOnce([mockOffice]),
    getOfficeById: jest.fn().mockResolvedValueOnce([mockOffice]),
    getAll: jest.fn().mockResolvedValueOnce([mockOffice]),
    createOffice: jest.fn().mockResolvedValueOnce(mockCreateMessage),
    deleteOffice: jest.fn().mockResolvedValueOnce(mockDeleteMessage),
    updateOffice: jest.fn().mockResolvedValueOnce(mockUpdateMessage),
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
      const offices = await controller.findAllOffice();
      expect(offices).toEqual([mockOffice]);
    });

    it('should throw an error when officeService throws an error', async () => {
      jest
        .spyOn(mockOfficeService, 'findAllOffice')
        .mockRejectedValue(mockError);
      await expect(controller.findAllOffice()).rejects.toThrowError(
        'Error al buscar todos los oficios',
      );
    });
  });
  describe('createOffice', () => {
    it('should create a new office', async () => {
      const result = await controller.createOffice(mockCreateOfficeDto);
      expect(result).toBe('oficio creado correctamente');
    });

    it('should throw an HttpException with HttpStatus.BAD_REQUEST when officeService throws an error', async () => {
      jest
        .spyOn(mockOfficeService, 'createOffice')
        .mockRejectedValueOnce(mockError);
      await expect(
        controller.createOffice(mockCreateOfficeDto),
      ).rejects.toThrowError(
        new HttpException(mockError.message, HttpStatus.BAD_REQUEST),
      );
    });
  });

  describe('findOne', () => {
    it('should return the office with the specified ID', async () => {
      const mockOffice = { id: 1, name: 'Office 1' };
      jest
        .spyOn(mockOfficeService, 'getOfficeById')
        .mockResolvedValueOnce(mockOffice);
      const result = await controller.findOne('1');
      expect(result).toEqual(mockOffice);
    });

    it('should throw an HttpException with HttpStatus.INTERNAL_SERVER_ERROR when officeService throws an error', async () => {
      const mockError = new Error('Test Error');
      jest
        .spyOn(mockOfficeService, 'getOfficeById')
        .mockRejectedValueOnce(mockError);
      await expect(controller.findOne('1')).rejects.toThrowError(
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
      expect(result).toBe('El oficio ha sido borrado correctamente');
    });

    it('should throw an HttpException with HttpStatus.FORBIDDEN when officeService throws an error', async () => {
      jest
        .spyOn(mockOfficeService, 'deleteOffice')
        .mockRejectedValue(mockError);
      const id = 1;
      await expect(controller.deleteOffice(id)).rejects.toThrowError(
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
      jest
        .spyOn(mockOfficeService, 'updateOffice')
        .mockRejectedValue(mockError);
      const id = 1;
      await expect(
        controller.updateOffice(id, mockCreateOfficeDto),
      ).rejects.toThrowError(
        new HttpException(mockError.message, HttpStatus.FORBIDDEN),
      );
    });
  });
});

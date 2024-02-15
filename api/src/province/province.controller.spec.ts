import { TestingModule, Test } from '@nestjs/testing';
import { getCustomRepositoryToken, getRepositoryToken } from '@nestjs/typeorm';
import { Province } from './province.entity';
import { City } from '../city/city.entity';
import { ProvinceController } from './province.controller';
import { ProvinceService } from './province.service';
import { HttpException } from '@nestjs/common';

describe('ProvinceController', () => {
  let controller: ProvinceController;

  const mockProvince = {
    id: 1,
    name: 'Miguelon',
  };

  const mockCity = {
    id: 2,
    name: 'Neumann',
  };

  const mockProvinceService = {
    getProvinces: jest.fn().mockResolvedValueOnce([mockProvince]),
    getOneProvince: jest.fn().mockResolvedValueOnce(mockProvince),
    deleteProvince: jest
      .fn()
      .mockResolvedValueOnce('Provincia eliminada correctamente'),
    //updateProvince: jest.fn().mockResolvedValueOnce(mockProvince),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProvinceController],
      providers: [
        {
          provide: ProvinceService,
          useValue: mockProvinceService,
        },
      ],
    }).compile();

    controller = module.get<ProvinceController>(ProvinceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getAllProvinces', () => {
    it('should return an mocked province list', async () => {
      const provinces = await controller.getProvinces();
      expect(mockProvinceService.getProvinces).toHaveBeenCalled();
      expect(provinces).toEqual([mockProvince]);
    });

    it('get an empty Province list', async () => {
      const emptyProvinceList = {};
      mockProvinceService.getProvinces = jest
        .fn()
        .mockResolvedValueOnce(emptyProvinceList);
      expect(await controller.getProvinces()).toBe(emptyProvinceList);
      expect(mockProvinceService.getProvinces).toHaveBeenCalled();
    });
  });

  describe('getOneProvince', () => {
    it('get a Province', async () => {
      const id = mockProvince.id;
      expect(await controller.getOneProvince(id)).toBe(mockProvince);
      expect(mockProvinceService.getOneProvince).toHaveBeenCalledWith(id);
    });
  });

  describe('deleteProvince', () => {
    it('delete a Province', async () => {
      const id = mockProvince.id;
      expect(await controller.deleteProvince(id)).toEqual(
        'Provincia eliminada correctamente',
      );
      expect(mockProvinceService.deleteProvince).toHaveBeenCalledWith(id);
    });
  });
});

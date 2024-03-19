import { TestingModule, Test } from '@nestjs/testing';
import { getCustomRepositoryToken, getRepositoryToken } from '@nestjs/typeorm';
import { Province } from '../province/province.entity';
import { City } from '../city/city.entity';
import { CityController } from './city.controller';
import { CityService } from './city.service';

describe('ProvinceController', () => {
  let controller: CityController;

  const mockProvince = {
    id: 1,
    name: 'Miguelon',
  };

  const mockCity = {
    id: 1,
    name: 'Neumann',
  };

  const mockCityService = {
    getCities: jest.fn().mockResolvedValueOnce([mockCity]),
    getOneCity: jest.fn().mockResolvedValueOnce(mockCity),
    deleteCity: jest
      .fn()
      .mockResolvedValueOnce('Ciudad eliminada correctamente'),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CityController],
      providers: [
        {
          provide: CityService,
          useValue: mockCityService,
        },
      ],
    }).compile();

    controller = module.get<CityController>(CityController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getAllCities', () => {
    it('should return an mocked province list', async () => {
      const cities = await controller.getCities();
      expect(mockCityService.getCities).toHaveBeenCalled();
      expect(cities).toEqual([mockCity]);
    });

    it('get an empty City list', async () => {
      const emptyProvinceList = {};
      mockCityService.getCities = jest
        .fn()
        .mockResolvedValueOnce(emptyProvinceList);
      expect(await controller.getCities()).toBe(emptyProvinceList);
      expect(mockCityService.getCities).toHaveBeenCalled();
    });
  });

  describe('getOneCity', () => {
    it('get a City', async () => {
      const id = mockProvince.id;
      expect(await controller.getOneCity(id)).toBe(mockCity);
      expect(mockCityService.getOneCity).toHaveBeenCalledWith(id);
    });
  });

  describe('deleteCity', () => {
    it('delete a City', async () => {
      const id = mockCity.id;
      expect(await controller.deleteCity(id)).toEqual(
        'Ciudad eliminada correctamente',
      );
      expect(mockCityService.deleteCity).toHaveBeenCalledWith(id);
    });
  });
});

import { TestingModule, Test } from '@nestjs/testing';
import { ProvinceService } from './province.service';
import { getCustomRepositoryToken, getRepositoryToken } from '@nestjs/typeorm';
import { Province } from './province.entity';
import { City } from '../city/city.entity';

describe('ProvinceService', () => {
  let provinceService: ProvinceService;

  const mockProvince = {
    id: 1,
    name: 'Miguelon',
  };

  const mockCity = {
    id: 2,
    name: 'Neumann',
  };

  const mockCityRepository = {
    find: jest.fn().mockResolvedValue([mockCity]),
    findOneBy: jest.fn().mockResolvedValue(mockCity),
    create: jest.fn().mockReturnValue(mockCity),
    save: jest.fn().mockResolvedValue(mockCity),
    existsBy: jest.fn().mockResolvedValue(true),
    update: jest.fn().mockResolvedValue(mockCity),
  };

  const mockProvinceRepository = {
    find: jest.fn().mockResolvedValue([mockProvince]),
    findOneBy: jest.fn().mockResolvedValue(mockProvince),
    findOne: jest.fn().mockResolvedValue(mockProvince),
    create: jest.fn().mockReturnValue(mockProvince),
    save: jest.fn().mockResolvedValue(mockProvince),
    existsBy: jest.fn().mockResolvedValue(true),
    update: jest.fn().mockResolvedValue(mockProvince),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProvinceService,
        {
          provide: getRepositoryToken(Province),
          useValue: mockProvinceRepository,
        },
        {
          provide: getRepositoryToken(City),
          useValue: mockCityRepository,
        },
      ],
    }).compile();

    provinceService = module.get<ProvinceService>(ProvinceService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findAll', () => {
    it('should return an array of provinces', async () => {
      const provinces = await provinceService.getProvinces();
      expect(provinces).toEqual([mockProvince]);
    });
  });

  describe('findOne', () => {
    it('should return a province by id', async () => {
      const id = 1;
      const province = await provinceService.getOneProvince(id);
      expect(province).toEqual(mockProvince);
    });
  });

  describe('create', () => {
    it('should create a new province', async () => {
      const newProvinceData = 'New Province';
      mockProvinceRepository.findOne.mockResolvedValueOnce(null);

      const createdProvince =
        await provinceService.createProvince(newProvinceData);
      expect(createdProvince).toEqual('Provincia Guardada');
    });
  });

  describe('update', () => {
    it('should update an existing province', async () => {
      const id = 1;
      const updatedProvinceData = 'Updated Province';

      const updatedProvince = await provinceService.updateProvince(
        id,
        updatedProvinceData,
      );
      expect(updatedProvince).toEqual('La provincia actualizada');
    });
  });

  describe('exists', () => {
    it('should return true if province exists', async () => {
      const id = 1;
      const exists = await provinceService.getOneProvince(id);
      expect(exists).toBe(mockProvince);
    });
  });
});

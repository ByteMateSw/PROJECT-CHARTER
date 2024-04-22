import { TestingModule, Test } from '@nestjs/testing';
import { CityService } from './city.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Province } from '../province/province.entity';
import { City } from '../city/city.entity';
import { User } from '../user/user.entity';

describe('CityService', () => {
  let cityService: CityService;

  const mockProvince = {
    id: 1,
    name: 'Miguelon',
  };

  const mockCity = {
    id: 1,
    name: 'Neumann',
  };

  const mockUser = {
    id: 1,
    firstName: 'TestFirstName',
    lastName: 'TestLastName',
    email: 'test@gmail.com',
    password: '1234',
    numberPhone: '+1123456789',
    birthday: '2000-01-01',
    dni: '444',
  };
  const mockResultBoolean = true;

  const rejectedEmail = 'rejected@gmail.com';
  const mockCityRepository = {
    find: jest.fn().mockResolvedValue([mockCity]),
    findOne: jest.fn().mockResolvedValue(mockCity),
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

  const mockUserRepository = {
    find: jest.fn().mockResolvedValue([mockUser]),
    findOneBy: jest.fn().mockResolvedValue(mockUser),
    create: jest.fn().mockReturnValue(mockUser),
    save: jest.fn().mockResolvedValue(mockUser),
    existsBy: jest.fn().mockResolvedValue(mockResultBoolean),
    update: jest.fn().mockResolvedValue(mockUser),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CityService,
        {
          provide: getRepositoryToken(Province),
          useValue: mockProvinceRepository,
        },
        {
          provide: getRepositoryToken(City),
          useValue: mockCityRepository,
        },
        { provide: getRepositoryToken(User), useValue: mockUserRepository },
      ],
    }).compile();

    cityService = module.get<CityService>(CityService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findAll', () => {
    it('should return an array of cities', async () => {
      const provinces = await cityService.getAllCities();
      expect(provinces).toEqual([mockCity]);
    });
  });

  describe('findOne', () => {
    it('should return a City by id', async () => {
      const id = 1;
      const city = await cityService.getCityById(id);
      expect(city).toEqual(mockCity);
    });
  });

  describe('create', () => {
    it('should create a new city', async () => {
      const newCityData = 'New City';
      mockCityRepository.findOne.mockResolvedValueOnce(null);

      const createdProvince = await cityService.createCity(newCityData);
      expect(createdProvince).toEqual('Ciudad Guardada');
    });
  });

  describe('update', () => {
    it('should update an existing city', async () => {
      const id = 1;
      const updatedCityData = 'Updated City';

      const updatedCity = await cityService.updateCity(id, updatedCityData);
      expect(updatedCity).toEqual('Ciudad actualizada');
    });
  });

  describe('exists', () => {
    it('should return true if cities exists', async () => {
      const id = 1;
      const exists = await cityService.getCityById(id);
      expect(exists).toBe(mockCity);
    });
  });
});

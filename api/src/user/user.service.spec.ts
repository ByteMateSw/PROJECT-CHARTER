import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserService } from './user.service';
import { Role } from '../role/role.entity';

describe('UserService', () => {
  let service: UserService;

  const mockUser = {
    id: 1,
    firstName: 'TestFirstName',
    lastName: 'TestLastName',
    email: 'test@gmail.com',
    password: '1234',
    numberPhone: '+1123456789',
    birthday: new Date(),
    dni: '444',
    isAccountValidate: false,
    dniValidate: false,
    isDeleted: false,
    acceptedToS: false,
  };

  const mockResultBoolean = true;

  const rejectedEmail = 'rejected@gmail.com';

  const mockUserRepository = {
    find: jest.fn().mockResolvedValue([mockUser]),
    findOneBy: jest.fn().mockResolvedValue(mockUser),
    create: jest.fn().mockReturnValue(mockUser),
    save: jest.fn().mockResolvedValue(mockUser),
    existsBy: jest.fn().mockResolvedValue(mockResultBoolean),
    update: jest.fn().mockResolvedValue(mockUser),
  };

  const mockRole = { name: 'test' };

  const mockRoleRepository = {
    findOneBy: jest.fn().mockResolvedValue(mockRole),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository,
        },
        {
          provide: getRepositoryToken(Role),
          useValue: mockRoleRepository,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAll', () => {
    it('should return an mocked user list', async () => {
      expect(await service.getAll()).toEqual([mockUser]);
      expect(mockUserRepository.find).toHaveBeenCalled();
    });
  });

  describe('getById', () => {
    it('should return an mocked user by their id', async () => {
      const id = mockUser.id;
      expect(await service.getById(id)).toEqual(mockUser);
      expect(mockUserRepository.findOneBy).toHaveBeenCalledWith({ id });
    });
  });

  describe('getByEmail', () => {
    it('should return an mocked user by their email', async () => {
      const email = mockUser.email;
      expect(await service.getByEmail(email)).toEqual(mockUser);
      expect(mockUserRepository.findOneBy).toHaveBeenCalledWith({ email });
    });
  });

  describe('createUser', () => {
    it('should create an mocked user with received data', async () => {
      const mockSaveUser = { ...mockUser, role: mockRole };

      jest.spyOn(service, 'hasEmail').mockResolvedValueOnce(false);

      expect(await service.createUser(mockUser)).toEqual(mockUser);
      expect(mockUserRepository.create).toHaveBeenCalledWith(mockUser);
      expect(mockUserRepository.save).toHaveBeenCalledWith(mockSaveUser);
    });

    it('should throw an error for repeated email', async () => {
      jest.spyOn(service, 'hasEmail').mockResolvedValueOnce(true);

      expect(async () => await service.createUser(mockUser)).rejects.toThrow(
        new Error('El Email está en uso'),
      );
    });
  });

  describe('hasEmail', () => {
    it('should return a boolean value', async () => {
      const email = mockUser.email;
      expect(await service.hasEmail(email)).toEqual(mockResultBoolean);
      expect(mockUserRepository.existsBy).toHaveBeenCalledWith({ email });
    });

    it('should throw an error to obtain an email', async () => {
      mockUserRepository.existsBy.mockRejectedValueOnce(rejectedEmail);
      expect(async () => await service.hasEmail(rejectedEmail)).rejects.toThrow(
        new Error('No se ha encontrado el Email'),
      );
    });
  });

  describe('deleteUser', () => {
    it('should delete an user', async () => {
      const id = mockUser.id;
      const mockUpdatedUser = { ...mockUser, isDeleted: true };
      expect(await service.deleteUser(id)).toEqual(mockUpdatedUser);
      expect(mockUserRepository.findOneBy).toHaveBeenCalledWith({ id });
      expect(mockUserRepository.save).toHaveBeenCalledWith(mockUpdatedUser);
    });

    it('should throw an error for nonexistent user', async () => {
      const id = mockUser.id;
      mockUserRepository.findOneBy.mockResolvedValueOnce(null);
      expect(async () => await service.deleteUser(id)).rejects.toThrow(
        new Error('El usuario no existe'),
      );
    });
  });

  describe('updateUser', () => {
    it('should update an user', async () => {
      const id = mockUser.id;
      expect(await service.updateUser(id, mockUser)).toEqual(mockUser);
      expect(mockUserRepository.existsBy).toHaveBeenCalledWith({ id });
      expect(mockUserRepository.update).toHaveBeenCalledWith({ id }, mockUser);
    });

    it('should throw an error for nonexistent user', async () => {
      const id = mockUser.id;
      mockUserRepository.existsBy.mockReturnValueOnce(false);
      expect(
        async () => await service.updateUser(id, mockUser),
      ).rejects.toThrow(new Error('El usuario no existe'));
    });
  });

  describe('accepteToSUser', () => {
    it('should update an user', async () => {
      const id = mockUser.id;
      service.accepteToSUser(id);
      expect(mockUserRepository.findOneBy).toHaveBeenCalledWith({ id });
      expect(mockUserRepository.save).toHaveBeenCalledWith(mockUser);
    });

    it('should throw an error for nonexistent user', async () => {
      const id = mockUser.id;
      jest.spyOn(service, 'getById').mockResolvedValueOnce(null);
      expect(async () => await service.accepteToSUser(id)).rejects.toThrow(
        new Error('Bad credentials'),
      );
    });
  });
});

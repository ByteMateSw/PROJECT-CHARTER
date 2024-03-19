import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserService } from './user.service';
import { Role } from '../role/role.entity';
import { BadRequestException, NotFoundException } from '@nestjs/common';

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
    refreshToken: 'token',
  };

  const mockResultBoolean = true;

  const rejectedEmail = 'rejected@gmail.com';

  const mockUserRepository = {
    find: jest.fn().mockResolvedValue([mockUser]),
    findOne: jest.fn().mockResolvedValue(mockUser),
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
      expect(await service.getAllUsers()).toEqual([mockUser]);
      expect(mockUserRepository.find).toHaveBeenCalled();
    });
  });

  describe('getUser', () => {
    const mockFindOptions = {
      relations: { city: true },
      select: {
        city: { id: false, name: true },
      },
    };

    it('should return an mocked user by their id', async () => {
      const id = mockUser.id;
      expect(await service.getUser({ id })).toEqual(mockUser);
      expect(mockUserRepository.findOne).toHaveBeenCalledWith({
        where: { id, email: undefined },
        ...mockFindOptions,
      });
    });

    it('should return an mocked user by their email', async () => {
      const email = mockUser.email;
      expect(await service.getUser({ email })).toEqual(mockUser);
      expect(mockUserRepository.findOne).toHaveBeenCalledWith({
        where: { id: undefined, email },
        ...mockFindOptions,
      });
    });
  });

  describe('createUser', () => {
    it('should create an mocked user with received data', async () => {
      const mockSaveUser = { ...mockUser, role: mockRole };

      jest.spyOn(service, 'existsEmail').mockResolvedValueOnce(false);

      expect(await service.createUser(mockUser)).toEqual(mockUser);
      expect(mockUserRepository.create).toHaveBeenCalledWith(mockUser);
      expect(mockUserRepository.save).toHaveBeenCalledWith(mockSaveUser);
    });

    it('should throw an error for repeated email', async () => {
      jest.spyOn(service, 'existsEmail').mockResolvedValueOnce(true);
      expect(async () => await service.createUser(mockUser)).rejects.toThrow(
        new BadRequestException('El Email está en uso'),
      );
      expect(service.existsEmail).toHaveBeenCalledWith(mockUser.email);
    });
  });

  describe('hasEmail', () => {
    it('should return a boolean value', async () => {
      const email = mockUser.email;
      expect(await service.existsEmail(email)).toEqual(mockResultBoolean);
      expect(mockUserRepository.existsBy).toHaveBeenCalledWith({ email });
    });
  });

  describe('deleteUser', () => {
    it('should delete an user', async () => {
      const id = mockUser.id;
      await service.deleteUser(id);
      expect(mockUserRepository.existsBy).toHaveBeenCalledWith({ id });
      expect(mockUserRepository.update).toHaveBeenCalledWith(
        { id },
        { isDeleted: true },
      );
    });

    it('should throw an error for nonexistent user', async () => {
      const id = mockUser.id;
      mockUserRepository.existsBy.mockResolvedValueOnce(false);
      expect(async () => await service.deleteUser(id)).rejects.toThrow(
        new NotFoundException('El usuario no existe'),
      );
      expect(mockUserRepository.existsBy).toHaveBeenCalledWith({ id });
    });
  });

  describe('updateUser', () => {
    it('should update an user', async () => {
      const id = mockUser.id;
      mockUserRepository.existsBy.mockResolvedValueOnce(true);
      mockUserRepository.existsBy.mockResolvedValueOnce(false);
      expect(await service.updateUser(id, mockUser)).toEqual(mockUser);
      expect(mockUserRepository.existsBy).toHaveBeenCalledWith({ id });
      expect(mockUserRepository.existsBy).toHaveBeenCalledWith({
        email: mockUser.email,
      });
      expect(mockUserRepository.update).toHaveBeenCalledWith({ id }, mockUser);
    });

    it('should throw an error for nonexistent user', async () => {
      const id = mockUser.id;
      mockUserRepository.existsBy.mockReturnValueOnce(false);
      expect(
        async () => await service.updateUser(id, mockUser),
      ).rejects.toThrow(new NotFoundException('El usuario no existe'));
      expect(mockUserRepository.existsBy).toHaveBeenCalledWith({ id });
    });

    it('should throw an error an existing email', async () => {
      const id = mockUser.id;
      const email = mockUser.email;
      mockUserRepository.existsBy.mockReturnValueOnce(true);
      mockUserRepository.existsBy.mockReturnValueOnce(true);
      expect(
        async () => await service.updateUser(id, mockUser),
      ).rejects.toThrow(new BadRequestException('El email ya existe'));
      expect(mockUserRepository.existsBy).toHaveBeenCalledWith({ id });
    });
  });

  describe('isToSAcceptedByUser', () => {
    it('should return if the user, by their id, accepted the ToS', async () => {
      const id = mockUser.id;
      expect(await service.isToSAcceptedByUser({ id })).toEqual(
        mockUser.acceptedToS,
      );
      expect(mockUserRepository.findOne).toHaveBeenCalledWith({
        where: { id, email: undefined },
        select: { acceptedToS: true },
      });
    });

    it('should return if the user, by their email, accepted the ToS', async () => {
      const email = mockUser.email;
      expect(await service.isToSAcceptedByUser({ email })).toEqual(
        mockUser.acceptedToS,
      );
      expect(mockUserRepository.findOne).toHaveBeenCalledWith({
        where: { id: undefined, email: email },
        select: { acceptedToS: true },
      });
    });
  });

  describe('accepteToSUser', () => {
    it('should accept the ToS of an user', async () => {
      const id = mockUser.id;
      await service.acceptToSUser(id);
      expect(mockUserRepository.existsBy).toHaveBeenCalledWith({ id });
      expect(mockUserRepository.update).toHaveBeenCalledWith(
        { id },
        { acceptedToS: true },
      );
    });

    it('should throw an error for nonexistent user', async () => {
      const id = mockUser.id;
      mockUserRepository.existsBy.mockResolvedValueOnce(false);
      expect(async () => await service.acceptToSUser(id)).rejects.toThrow(
        new BadRequestException('Credenciales incorrectas'),
      );
    });
  });

  describe('getPassword', () => {
    it('should get the user password of an user', async () => {
      const id = mockUser.id;
      const password = mockUser.password;
      expect(await service.getUserPassword(id)).toEqual(password);
    });
  });

  describe('getRefreshToken', () => {
    const id = mockUser.id;

    it('should return an refresh token', async () => {
      expect(await service.getRefreshToken(id)).toEqual(mockUser.refreshToken);
      expect(mockUserRepository.findOne).toHaveBeenCalledWith({
        where: { id },
        select: { refreshToken: true },
      });
    });

    it('should thrown an error for non-existent user', async () => {
      mockUserRepository.findOne.mockResolvedValueOnce(null);
      expect(async () => await service.getRefreshToken(id)).rejects.toThrow(
        new NotFoundException('El usuario no existe'),
      );
    });
  });

  describe('updateRefreshToken', () => {
    const id = mockUser.id;
    const mockRefreshToken = mockUser.refreshToken;

    it('should update the refresh token', async () => {
      await service.updateRefreshToken(id, mockRefreshToken);
      expect(mockUserRepository.existsBy).toHaveBeenCalledWith({ id });
      expect(mockUserRepository.update).toHaveBeenCalledWith(
        { id },
        { refreshToken: mockRefreshToken },
      );
    });

    it('should thrown an error for non-existent user', async () => {
      mockUserRepository.existsBy.mockResolvedValueOnce(false);
      expect(
        async () => await service.updateRefreshToken(id, mockRefreshToken),
      ).rejects.toThrow(new NotFoundException('El usuario no existe'));
    });
  });
});

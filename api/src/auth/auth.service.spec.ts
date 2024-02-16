import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { HashService } from './hash.service';
import { JwtService } from '@nestjs/jwt';
import { ForbiddenException, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import argon2 from 'argon2';

describe('AuthService', () => {
  let service: AuthService;

  const mockUser = {
    id: 1,
    firstName: 'TestFirstName',
    lastName: 'TestLastName',
    email: 'test@gmail.com',
    password: '1234',
    numberPhone: '+1123456789',
    birthday: new Date(),
    dni: '444',
  };

  const mockRole = 'test';

  const mockToken = 'testToken';
  const mockTokens = { access_token: mockToken, refresh_token: mockToken };

  const mockPayload = {
    sub: mockUser.id,
    email: mockUser.email,
    role: mockRole,
  };

  const mockConfigValue = 'config';

  let mockUserService = {
    getUserById: jest.fn().mockResolvedValue(mockUser),
    getByEmail: jest.fn().mockResolvedValue(mockUser),
    createUser: jest.fn().mockResolvedValue(mockUser),
    getRole: jest.fn().mockResolvedValue(mockRole),
    getPassword: jest.fn().mockResolvedValue(mockUser.password),
    getRefreshToken: jest.fn().mockResolvedValue(mockToken),
    updateRefreshToken: jest.fn(),
  };

  let mockHashService = {
    compareHash: jest.fn().mockResolvedValue(true),
  };

  let mockJWTService = {
    signAsync: jest.fn().mockResolvedValue(mockToken),
  };

  let mockConfigService = {
    get: jest.fn().mockReturnValue(mockConfigValue),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UserService,
          useValue: mockUserService,
        },
        {
          provide: HashService,
          useValue: mockHashService,
        },
        {
          provide: JwtService,
          useValue: mockJWTService,
        },
        {
          provide: ConfigService,
          useValue: mockConfigService,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  describe('login', () => {
    const mockEmail = mockUser.email;

    it('should login the user with the received credentrials', async () => {
      jest.spyOn(service, 'getTokens').mockResolvedValueOnce(mockTokens);
      jest.spyOn(service, 'updateRefreshToken').mockResolvedValueOnce();
      expect(await service.login(mockEmail)).toEqual(mockTokens);
      expect(mockUserService.getByEmail).toHaveBeenCalledWith(mockEmail);
      expect(mockUserService.getRole).toHaveBeenCalledWith(mockUser.id);
      expect(service.getTokens).toHaveBeenCalledWith(mockPayload);
      expect(service.updateRefreshToken).toHaveBeenCalledWith(
        mockUser.id,
        mockToken,
      );
    });

    it('should not found the user with this credentials', async () => {
      mockUserService.getByEmail.mockResolvedValueOnce(null);
      expect(async () => await service.login(mockEmail)).rejects.toThrow(
        new UnauthorizedException(),
      );
    });
  });

  describe('getTokens', () => {
    const mockOptions = { secret: mockConfigValue, expiresIn: mockConfigValue };

    it('should return access and refresh tokens', async () => {
      expect(await service.getTokens(mockPayload)).toEqual(mockTokens);
      expect(mockJWTService.signAsync).toHaveBeenCalledWith(
        mockPayload,
        mockOptions,
      );
      expect(mockJWTService.signAsync).toHaveBeenCalledTimes(2);
      expect(mockConfigService.get).toHaveBeenCalledTimes(4);
    });
  });

  describe('refreshTokens', () => {
    const id = mockUser.id;

    it('should refresh the access and refersh tokens', async () => {
      jest.spyOn(argon2, 'verify').mockResolvedValueOnce(true);
      jest.spyOn(service, 'getTokens').mockResolvedValueOnce(mockTokens);
      jest.spyOn(service, 'updateRefreshToken').mockResolvedValueOnce();
      expect(await service.refreshTokens(id, mockToken)).toEqual(mockTokens);
      expect(mockUserService.getUserById).toHaveBeenCalledWith(id);
      expect(mockUserService.getRole).toHaveBeenCalledWith(id);
      expect(mockUserService.getRefreshToken).toHaveBeenCalledWith(id);
      expect(argon2.verify).toHaveBeenCalledWith(mockToken, mockToken);
      expect(service.getTokens).toHaveBeenCalledWith(mockPayload);
      expect(service.updateRefreshToken).toHaveBeenCalledWith(
        mockUser.id,
        mockToken,
      );
      expect(service.updateRefreshToken).toHaveBeenCalledWith(
        mockUser.id,
        mockToken,
      );
    });

    it('should thrown an error when does not find an user', async () => {
      mockUserService.getUserById.mockResolvedValueOnce(null);
      expect(
        async () => await service.refreshTokens(id, mockToken),
      ).rejects.toThrow(new ForbiddenException('Access Denied'));
      expect(mockUserService.getUserById).toHaveBeenCalledWith(id);
    });

    it('should thrown an error when user does not have a refresh token', async () => {
      mockUserService.getRefreshToken.mockResolvedValueOnce(null);
      expect(
        async () => await service.refreshTokens(id, mockToken),
      ).rejects.toThrow(new ForbiddenException('Access Denied'));
      expect(mockUserService.getUserById).toHaveBeenCalledWith(id);
      expect(mockUserService.getRole).toHaveBeenCalledWith(id);
      expect(mockUserService.getRefreshToken).toHaveBeenCalledWith(id);
    });

    it('should thrown an error when the tokens do not match', async () => {
      jest.spyOn(argon2, 'verify').mockResolvedValueOnce(false);
      expect(
        async () => await service.refreshTokens(id, mockToken),
      ).rejects.toThrow(new ForbiddenException('Access Denied'));
      expect(mockUserService.getUserById).toHaveBeenCalledWith(id);
      expect(mockUserService.getRole).toHaveBeenCalledWith(id);
      expect(mockUserService.getRefreshToken).toHaveBeenCalledWith(id);
    });
  });

  describe('updateRefreshToken', () => {
    it('should update an refresh tokens', async () => {
      jest.spyOn(argon2, 'hash').mockResolvedValueOnce(mockToken);
      await service.updateRefreshToken(mockUser.id, mockToken);
      expect(mockUserService.updateRefreshToken).toHaveBeenCalledWith(
        mockUser.id,
        mockToken,
      );
    });
  });

  describe('register', () => {
    it('should register an user', async () => {
      expect(await service.register(mockUser)).toEqual(mockUser);
      expect(mockUserService.createUser).toHaveBeenCalledWith(mockUser);
    });

    it('should thrown an error to create an user', async () => {
      mockUserService.createUser.mockResolvedValueOnce(null);
      expect(async () => await service.register(mockUser)).rejects.toThrow(
        new ForbiddenException('Error al crear al usuario'),
      );
      expect(mockUserService.createUser).toHaveBeenCalledWith(mockUser);
    });
  });

  describe('validate', () => {
    const mockEmail = mockUser.email;
    const mockPassword = 'TestPassword';

    it('should validate an user', async () => {
      expect(await service.validate(mockEmail, mockPassword)).toEqual(mockUser);
      expect(mockUserService.getByEmail).toHaveBeenCalledWith(mockEmail);
      expect(mockUserService.getPassword).toHaveBeenCalledWith(mockUser.id);
      expect(mockHashService.compareHash).toHaveBeenCalledWith(
        mockUser.password,
        mockPassword,
      );
    });

    it('should does not found the user', async () => {
      mockUserService.getByEmail.mockResolvedValueOnce(null);
      expect(
        async () => await service.validate(mockEmail, mockPassword),
      ).rejects.toThrow(new UnauthorizedException());
    });

    it('should failed to compare the password with the hash storaged', async () => {
      mockHashService.compareHash.mockResolvedValueOnce(false);
      expect(
        async () => await service.validate(mockEmail, mockPassword),
      ).rejects.toThrow(new UnauthorizedException());
    });
  });
});

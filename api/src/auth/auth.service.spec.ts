import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { HashService } from './hash.service';
import { JwtService } from '@nestjs/jwt';
import {
  BadRequestException,
  ForbiddenException,
  UnauthorizedException,
} from '@nestjs/common';
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
    getUser: jest.fn().mockResolvedValue(mockUser),
    createUser: jest.fn().mockResolvedValue(mockUser),
    getRole: jest.fn().mockResolvedValue(mockRole),
    getUserPassword: jest.fn().mockResolvedValue(mockUser.password),
    getRefreshToken: jest.fn().mockResolvedValue(mockToken),
    updateRefreshToken: jest.fn(),
    validateUser: jest.fn(),
  };

  let mockHashService = {
    compareHash: jest.fn().mockResolvedValue(true),
  };

  let mockJWTService = {
    signAsync: jest.fn().mockResolvedValue(mockToken),
    verifyAsync: jest.fn().mockResolvedValue(mockPayload),
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
      expect(mockUserService.getUser).toHaveBeenCalledWith({
        email: mockEmail,
      });
      expect(mockUserService.getRole).toHaveBeenCalledWith(mockUser.id);
      expect(service.getTokens).toHaveBeenCalledWith(mockPayload);
      expect(service.updateRefreshToken).toHaveBeenCalledWith(
        mockUser.id,
        mockToken,
      );
    });

    it('should not found the user with this credentials', async () => {
      mockUserService.getUser.mockResolvedValueOnce(null);
      expect(async () => await service.login(mockEmail)).rejects.toThrow(
        new UnauthorizedException(),
      );
    });
  });

  describe('getVerificationToken', () => {
    it('should return the verify token of the user', async () => {
      const mockEmail = mockUser.email;

      expect(await service.getVerificationToken(mockEmail)).toEqual(mockToken);
      expect(mockJWTService.signAsync).toHaveBeenCalledWith(
        {
          email: mockEmail,
        },
        {
          secret: mockConfigValue,
          expiresIn: mockConfigValue,
        },
      );
    });
  });

  describe('verifyVerificationToken', () => {
    it('should return the verify token of the user', async () => {
      expect(await service.verifyVerificationToken(mockToken)).toEqual(
        mockPayload,
      );
      expect(mockJWTService.verifyAsync).toHaveBeenCalledWith(mockToken, {
        secret: mockConfigValue,
        ignoreExpiration: false,
      });
    });

    it('should throw an error to the verification of the token', async () => {
      const mockEmail = mockUser.email;
      mockJWTService.verifyAsync.mockRejectedValueOnce(null);

      expect(
        async () => await service.verifyVerificationToken(mockToken),
      ).rejects.toThrow(new BadRequestException('Error al ingresar el token'));
      expect(mockJWTService.verifyAsync).toHaveBeenCalledWith(mockToken, {
        secret: mockConfigValue,
        ignoreExpiration: false,
      });
    });
  });

  describe('validateAccount', () => {
    it('should return the verify token of the user', async () => {
      const mockEmail = mockUser.email;

      await service.validateAccount(mockEmail);
      expect(mockUserService.validateUser).toHaveBeenCalledWith({
        email: mockEmail,
      });
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
    });
  });

  describe('refreshTokens', () => {
    const id = mockUser.id;

    it('should refresh the access and refersh tokens', async () => {
      jest.spyOn(argon2, 'verify').mockResolvedValueOnce(true);
      jest.spyOn(service, 'getTokens').mockResolvedValueOnce(mockTokens);
      jest.spyOn(service, 'updateRefreshToken').mockResolvedValueOnce();
      expect(await service.refreshTokens(id, mockToken)).toEqual(mockTokens);
      expect(mockUserService.getUser).toHaveBeenCalledWith({ id });
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
      mockUserService.getUser.mockResolvedValueOnce(null);
      expect(
        async () => await service.refreshTokens(id, mockToken),
      ).rejects.toThrow(new ForbiddenException('Accesso denegado'));
      expect(mockUserService.getUser).toHaveBeenCalledWith({ id });
    });

    it('should thrown an error when user does not have a refresh token', async () => {
      mockUserService.getRefreshToken.mockResolvedValueOnce(null);
      expect(
        async () => await service.refreshTokens(id, mockToken),
      ).rejects.toThrow(new ForbiddenException('Accesso denegado'));
      expect(mockUserService.getUser).toHaveBeenCalledWith({ id });
      expect(mockUserService.getRole).toHaveBeenCalledWith(id);
      expect(mockUserService.getRefreshToken).toHaveBeenCalledWith(id);
    });

    it('should thrown an error when the tokens do not match', async () => {
      jest.spyOn(argon2, 'verify').mockResolvedValueOnce(false);
      expect(
        async () => await service.refreshTokens(id, mockToken),
      ).rejects.toThrow(new ForbiddenException('Accesso denegado'));
      expect(mockUserService.getUser).toHaveBeenCalledWith({ id });
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
      expect(mockUserService.getUser).toHaveBeenCalledWith({
        email: mockEmail,
      });
      expect(mockUserService.getUserPassword).toHaveBeenCalledWith(mockUser.id);
      expect(mockHashService.compareHash).toHaveBeenCalledWith(
        mockUser.password,
        mockPassword,
      );
    });

    it('should does not found the user', async () => {
      mockUserService.getUser.mockResolvedValueOnce(null);
      expect(
        async () => await service.validate(mockEmail, mockPassword),
      ).rejects.toThrow(new BadRequestException('Credenciales incorrectas'));
    });

    it('should failed to compare the password with the hash storaged', async () => {
      mockHashService.compareHash.mockResolvedValueOnce(false);
      expect(
        async () => await service.validate(mockEmail, mockPassword),
      ).rejects.toThrow(new BadRequestException('Credenciales incorrectas'));
    });
  });
});

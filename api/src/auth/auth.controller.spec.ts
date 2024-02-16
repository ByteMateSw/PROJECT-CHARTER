import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ToSGuard } from './ToS/ToS.guard';
import { Response } from 'express';
import { LocalAuthGuard } from './local/local-auth.guard';
import { RefreshTokenGuard } from './jwt/refresh.guard';

describe('AuthController', () => {
  let controller: AuthController;

  const mockUser = {
    firstName: 'TestFirstName',
    lastName: 'TestLastName',
    email: 'test@gmail.com',
    password: '1234',
    numberPhone: '+1123456789',
    birthday: new Date(),
    dni: '444',
  };

  const mockLoginUser = { email: mockUser.email, password: mockUser.password };

  const successMessage = { message: 'El usuario a sido creado con éxito' };
  const failureMessage = { message: 'No se pudo crear el usuario' };

  const mockToken = 'testToken';
  const mockAccessToken = { access_token: mockToken };
  const mockRefreshToken = { refresh_token: mockToken };
  const mockTokens = { access_token: mockToken, refresh_token: mockToken };

  let mockAuthService = {
    register: jest.fn().mockResolvedValue(mockUser),
    login: jest.fn().mockResolvedValue(mockTokens),
    setRefreshToken: jest.fn().mockReturnValue(mockRefreshToken),
    refreshTokens: jest.fn().mockResolvedValue(mockTokens),
  };

  let mockToSGuard = {
    canActivate: () => true,
  };

  let mockLocalAuthGuard = {
    canActivate: () => true,
  };

  let mockRefreshTokenGuard = {
    canActivate: () => true,
  };

  let mockResponse = {
    cookie: jest.fn(),
  } as unknown as Response;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
      ],
    })
      .overrideGuard(ToSGuard)
      .useValue(mockToSGuard)
      .overrideGuard(LocalAuthGuard)
      .useValue(mockLocalAuthGuard)
      .overrideGuard(RefreshTokenGuard)
      .useValue(mockRefreshTokenGuard)
      .compile();

    controller = module.get<AuthController>(AuthController);
  });

  describe('register', () => {
    it('should register an user', async () => {
      expect(await controller.registerUser(mockUser)).toEqual(successMessage);
      expect(mockAuthService.register).toHaveBeenCalledWith(mockUser);
    });

    it('should fail to register an user', async () => {
      mockAuthService.register.mockResolvedValueOnce(null);
      expect(await controller.registerUser(mockUser)).toEqual(failureMessage);
      expect(mockAuthService.register).toHaveBeenCalledWith(mockUser);
    });
  });

  describe('login', () => {
    it('should login the user', async () => {
      expect(await controller.loginUser(mockLoginUser, mockResponse)).toEqual(
        mockAccessToken,
      );
      expect(mockAuthService.login).toHaveBeenCalledWith(mockLoginUser.email);
      expect(mockAuthService.setRefreshToken).toHaveBeenCalledWith(
        mockToken,
        mockResponse,
      );
    });
  });

  describe('refresh', () => {
    it('should refresh the tokens of the user', async () => {
      const id = 1;
      expect(
        await controller.refreshTokens(mockToken, id, mockResponse),
      ).toEqual(mockAccessToken);
      expect(mockAuthService.refreshTokens).toHaveBeenCalledWith(id, mockToken);
      expect(mockAuthService.setRefreshToken).toHaveBeenCalledWith(
        mockToken,
        mockResponse,
      );
    });
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { LocalAuthGuard } from './local/local-auth.guard';
import { RefreshTokenGuard } from './jwt/refresh.guard';
import { MailService } from '../mailer/mailer.service';

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
  const verifyMessage = { message: 'La cuenta del usuario ha sido validada.' };

  const mockToken = 'testToken';
  const mockAccessToken = { access_token: mockToken };
  const mockRefreshToken = { refresh_token: mockToken };
  const mockTokens = { access_token: mockToken, refresh_token: mockToken };
  const mockVerifyToken = { email: 'test' };

  let mockAuthService = {
    register: jest.fn().mockResolvedValue(mockUser),
    login: jest.fn().mockResolvedValue(mockTokens),
    setRefreshToken: jest.fn().mockReturnValue(mockRefreshToken),
    refreshTokens: jest.fn().mockResolvedValue(mockTokens),
    getVerificationToken: jest.fn().mockResolvedValue(mockToken),
    verifyVerificationToken: jest.fn().mockResolvedValue(mockVerifyToken),
    validateAccount: jest.fn(),
  };

  const mockMailerService = {
    SendVerificationMail: jest.fn(),
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
        {
          provide: MailService,
          useValue: mockMailerService,
        },
      ],
    })
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
      expect(mockAuthService.getVerificationToken).toHaveBeenCalledWith(
        mockUser.email,
      );
      expect(mockMailerService.SendVerificationMail).toHaveBeenCalledTimes(1);
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

  describe('verify', () => {
    it('should verify the user', async () => {
      expect(await controller.verifyUser(mockToken)).toEqual(verifyMessage);
      expect(mockAuthService.verifyVerificationToken).toHaveBeenCalledWith(
        mockToken,
      );
      expect(mockAuthService.validateAccount).toHaveBeenCalledWith(
        mockVerifyToken.email,
      );
    });
  });
});

import { Test } from '@nestjs/testing';
import {
  BadRequestException,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { ToSGuard } from './ToS.guard';
import { UserService } from '../../../src/user/user.service';

describe('MyGuard', () => {
  let guard: ToSGuard;

  const mockBody = {
    email: 'test@gmail.com',
  };

  const mockUserService = {
    existsEmail: jest.fn().mockResolvedValue(true),
    isToSAcceptedByUser: jest.fn().mockResolvedValue(true),
  };

  const mockExecutionContext = {
    switchToHttp: jest.fn().mockReturnValue({
      getRequest: jest.fn().mockReturnValue({ body: mockBody }),
    }),
  };

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        ToSGuard,
        {
          provide: UserService,
          useValue: mockUserService,
        },
      ],
    }).compile();

    guard = moduleRef.get<ToSGuard>(ToSGuard);
  });

  it('should grant access', async () => {
    expect(
      await guard.canActivate(mockExecutionContext as any as ExecutionContext),
    ).toEqual(true);
    expect(mockExecutionContext.switchToHttp).toHaveBeenCalled();
    expect(mockUserService.existsEmail).toHaveBeenCalledWith(mockBody.email);
    expect(mockUserService.isToSAcceptedByUser).toHaveBeenCalledWith({
      email: mockBody.email,
    });
  });

  it('should throw an exception because the request body does not have the email field.', async () => {
    mockExecutionContext.switchToHttp.mockReturnValueOnce({
      getRequest: () => {
        return { body: {} };
      },
    });
    expect(
      async () =>
        await guard.canActivate(
          mockExecutionContext as any as ExecutionContext,
        ),
    ).rejects.toThrow(new BadRequestException('Credenciales incorrectas'));
  });

  it('should throw an exception because the request user does not exists.', () => {
    mockUserService.existsEmail.mockResolvedValueOnce(false);
    expect(
      async () =>
        await guard.canActivate(
          mockExecutionContext as any as ExecutionContext,
        ),
    ).rejects.toThrow(new BadRequestException('Credenciales incorrectas'));
  });

  it('should throw an exception because the user does not accepted the ToS.', async () => {
    mockUserService.isToSAcceptedByUser.mockResolvedValueOnce(false);
    expect(
      async () =>
        await guard.canActivate(
          mockExecutionContext as any as ExecutionContext,
        ),
    ).rejects.toThrow(
      new UnauthorizedException(
        'No se aceptó los Términos y Condiciones del servicio.',
      ),
    );
  });
});

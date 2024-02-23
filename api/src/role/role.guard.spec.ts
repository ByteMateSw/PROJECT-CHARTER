import { Test } from '@nestjs/testing';
import { RoleGuard } from './role.guard';
import { ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './role.decorator';

describe('MyGuard', () => {
  let guard: RoleGuard;

  const mockRole = {
    id: 1,
    name: 'test',
  };

  let mockReflector = {
    getAllAndOverride: jest.fn().mockReturnValue([mockRole.name]),
  };

  const mockExecutionContext = {
    switchToHttp: jest.fn().mockReturnValue({
      getRequest: jest.fn().mockReturnValue({ user: { role: mockRole.name } }),
    }),
    getHandler: jest.fn().mockReturnValue('Handler'),
    getClass: jest.fn().mockReturnValue('Class'),
  };

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [RoleGuard, { provide: Reflector, useValue: mockReflector }],
    }).compile();

    guard = moduleRef.get<RoleGuard>(RoleGuard);
  });

  it('should grant access', () => {
    expect(
      guard.canActivate(mockExecutionContext as any as ExecutionContext),
    ).toEqual(true);
    expect(mockReflector.getAllAndOverride).toHaveBeenCalledWith(ROLES_KEY, [
      mockExecutionContext.getHandler(),
      mockExecutionContext.getClass(),
    ]);
    expect(mockExecutionContext.switchToHttp).toHaveBeenCalled();
  });

  it('should does nothing because it has no role.', () => {
    mockReflector.getAllAndOverride.mockReturnValueOnce(undefined);
    expect(
      guard.canActivate(mockExecutionContext as any as ExecutionContext),
    ).toEqual(true);
  });

  it('should deny access because there is no user in the request', () => {
    mockExecutionContext.switchToHttp.mockReturnValueOnce({
      getRequest: jest.fn().mockReturnValueOnce({ user: null }),
    });
    expect(
      guard.canActivate(mockExecutionContext as any as ExecutionContext),
    ).toEqual(false);
    expect(mockReflector.getAllAndOverride).toHaveBeenCalledWith(ROLES_KEY, [
      mockExecutionContext.getHandler(),
      mockExecutionContext.getClass(),
    ]);
    expect(mockExecutionContext.switchToHttp).toHaveBeenCalled();
  });

  it('should throw an exception because the user does not have the right role', () => {
    const mockRole = 'wrong_role';
    mockExecutionContext.switchToHttp.mockReturnValueOnce({
      getRequest: jest.fn().mockReturnValueOnce({ user: mockRole }),
    });
    expect(async () =>
      guard.canActivate(mockExecutionContext as any as ExecutionContext),
    ).rejects.toThrow(new UnauthorizedException());
    expect(mockReflector.getAllAndOverride).toHaveBeenCalledWith(ROLES_KEY, [
      mockExecutionContext.getHandler(),
      mockExecutionContext.getClass(),
    ]);
    expect(mockExecutionContext.switchToHttp).toHaveBeenCalled();
  });
});

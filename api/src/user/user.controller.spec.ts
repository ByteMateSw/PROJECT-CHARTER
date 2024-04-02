import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { Role } from '../utils/enums/role.enum';

describe('UserController', () => {
  let controller: UserController;

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

  const mockUpdateUser = {
    firstName: 'Ivan',
  };

  const mockUserParam = {
    id: mockUser.id,
    email: mockUser.email,
    role: Role.User,
  };

  const mockUserService = {
    getAllUsers: jest.fn().mockResolvedValueOnce([mockUser]),
    getUserBy: jest.fn().mockResolvedValueOnce(mockUser),
    deleteUser: jest.fn().mockResolvedValueOnce(undefined),
    updateUser: jest.fn().mockResolvedValueOnce(mockUser),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService],
    })
      .overrideProvider(UserService)
      .useValue(mockUserService)
      .compile();

    controller = module.get<UserController>(UserController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAllUsers', () => {
    it('should return an mocked user list', async () => {
      const users = await controller.getAllUsers(0, 0);
      expect(mockUserService.getAllUsers).toHaveBeenCalled();
      expect(users).toEqual([mockUser]);
    });

    it('get an empty user list', async () => {
      const emptyUserList = {};
      mockUserService.getAllUsers = jest
        .fn()
        .mockResolvedValueOnce(emptyUserList);
      expect(await controller.getAllUsers(0, 0)).toBe(emptyUserList);
      expect(mockUserService.getAllUsers).toHaveBeenCalled();
    });
  });

  describe('getUserById', () => {
    it('should get an user', async () => {
      const id = mockUser.id;
      expect(await controller.getUserById(id)).toBe(mockUser);
      expect(mockUserService.getUserBy).toHaveBeenCalledWith({ id });
    });
  });

  describe('deleteUser', () => {
    it('delete an user', async () => {
      const id = mockUser.id;
      expect(await controller.deleteUser(mockUserParam)).toEqual(undefined);
      expect(mockUserService.deleteUser).toHaveBeenCalledWith(id);
    });
  });

  describe('updateUser', () => {
    it('should update the user', async () => {
      const id = mockUser.id;
      expect(await controller.updateUser(id, mockUpdateUser)).toEqual(mockUser);
      expect(mockUserService.updateUser).toHaveBeenCalledWith(
        id,
        mockUpdateUser,
      );
    });
  });
});

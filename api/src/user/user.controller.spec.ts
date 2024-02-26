import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { NotFoundException } from '@nestjs/common';

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

  const mockDeleteMessage = {
    message: 'El usuario ha sido borrado correctamente',
  };

  const mockUpdateMessage = {
    message: 'El usuario se ha actualizado correctamente',
  };

  const mockUserService = {
    getAllUsers: jest.fn().mockResolvedValueOnce([mockUser]),
    getUser: jest.fn().mockResolvedValueOnce(mockUser),
    deleteUser: jest.fn().mockResolvedValueOnce(mockDeleteMessage),
    updateUser: jest.fn().mockResolvedValueOnce(mockUpdateMessage),
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

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAllUsers', () => {
    it('should return an mocked user list', async () => {
      const users = await controller.getAllUsers();
      expect(mockUserService.getAllUsers).toHaveBeenCalled();
      expect(users).toEqual([mockUser]);
    });

    it('get an empty user list', async () => {
      const emptyUserList = {};
      mockUserService.getAllUsers = jest
        .fn()
        .mockResolvedValueOnce(emptyUserList);
      expect(await controller.getAllUsers()).toBe(emptyUserList);
      expect(mockUserService.getAllUsers).toHaveBeenCalled();
    });
  });

  describe('getUserById', () => {
    it('should get an user', async () => {
      const id = mockUser.id;
      expect(await controller.getUserById(id)).toBe(mockUser);
      expect(mockUserService.getUser).toHaveBeenCalledWith({ id });
    });

    it('should thrown an error to obtain the user', async () => {
      const id = mockUser.id;
      mockUserService.getUser.mockResolvedValueOnce(null);
      expect(async () => await controller.getUserById(id)).rejects.toThrow(
        new NotFoundException('No se encontró el usuario'),
      );
      expect(mockUserService.getUser).toHaveBeenCalledWith({ id });
    });
  });

  describe('deleteUser', () => {
    it('delete an user', async () => {
      const id = mockUser.id;
      expect(await controller.deleteUser(id)).toEqual(mockDeleteMessage);
      expect(mockUserService.deleteUser).toHaveBeenCalledWith(id);
    });
  });

  describe('updateUser', () => {
    it('should update the user', async () => {
      const id = mockUser.id;
      expect(await controller.updateUser(id, mockUpdateUser)).toEqual(
        mockUpdateMessage,
      );
      expect(mockUserService.updateUser).toHaveBeenCalledWith(
        id,
        mockUpdateUser,
      );
    });
  });
});

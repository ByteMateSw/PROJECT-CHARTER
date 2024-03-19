import { Test, TestingModule } from '@nestjs/testing';
import { ToSController } from './ToS.controller';
import { UserService } from '../../user/user.service';

describe('ToSController', () => {
  let controller: ToSController;

  const successMessage = { message: 'Se aceptó los Términos y Servicios' };

  let mockUserService = {
    acceptToSUser: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ToSController],
      providers: [
        {
          provide: UserService,
          useValue: mockUserService,
        },
      ],
    }).compile();

    controller = module.get<ToSController>(ToSController);
  });

  describe('acceptToS', () => {
    const id = 1;

    it('should accept terms and services', async () => {
      expect(await controller.acceptToS(id)).toEqual(successMessage);
      expect(mockUserService.acceptToSUser).toHaveBeenCalledWith(id);
    });
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { NotificationsService } from './notifications.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Notifications } from './notifications.entity';
import { CreateNotificationsDTO } from './dto/notification.dto';
import { UserService } from '../user/user.service';
import { User } from "../user/user.entity";
import { Repository } from 'typeorm';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { mock } from 'node:test';

describe('NotificationsService', () => {
  let service: NotificationsService;

  const mockNotifications = {

  }

  const mockUserService = {
    getUser: jest.fn() .mockResolvedValue({ }),
  };

  const mockNotificationsRepository = {
    create: jest.fn() .mockReturnValue(mockNotifications),
    save: jest.fn() .mockResolvedValue(mockNotifications), 
    createQueryBuilder: jest.fn() .mockReturnValue({ delete: jest.fn().mockReturnValue({from: jest.fn() .mockReturnValue({where: jest.fn().mockReturnValue({execute: jest.fn().mockResolvedValue(mockNotifications)})})})}),
    from: jest.fn(), 
    delete: jest.fn(),
    where: jest.fn(),
    execute: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NotificationsService,
        { provide: UserService, useValue: mockUserService },
        { provide: getRepositoryToken(Notifications), useValue: mockNotificationsRepository },
      ],
    }).compile();

    service = module.get<NotificationsService>(NotificationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createNotification', () => {
    it('should throw NotFoundException if user not found', async () => {
      mockUserService.getUser.mockResolvedValueOnce(null);
      await expect(async() =>
        await service.createNotification(19, {} as CreateNotificationsDTO)).rejects.toThrow(NotFoundException);
    });


    it('should create and save notification', async () => {
      const mockUser = { id: 19 };
      const mockNotificationDto: CreateNotificationsDTO = {title:'titulo',
        creationTime: new Date (2022/4/3),
        description:'descripción',
      }
      const mockNotification = new Notifications(); 
      mockNotificationsRepository.create.mockReturnValueOnce(mockNotification)

      const result = await service.createNotification(1, mockNotificationDto);

      expect(result).toEqual(mockNotification);
      expect(mockUserService.getUser).toHaveBeenCalledWith({ id: 1 });
      expect(mockNotificationsRepository.create).toHaveBeenCalledWith(mockNotificationDto);
      expect(mockNotification.creationTime).toBeInstanceOf(Date);
      expect(mockNotification.expireAt).toBeInstanceOf(Date);
      expect(mockNotificationsRepository.save).toHaveBeenCalledWith(mockNotification);
    });

  });

  describe('CleanExpiredNotifications',()=> {
    it('should delete the expired notifications', async ()=> {
      const mockNow = new Date ();
      const mockExpirationDate = new Date ()
      mockExpirationDate.setDate(mockExpirationDate.getDate() - 15);

      const result = await service.CleanExpiredNotifications()

      expect(mockNow).toBeDefined();
      expect(mockExpirationDate).toBeDefined();
      expect(mockNotificationsRepository.createQueryBuilder).toHaveBeenCalled();
      expect(mockNotificationsRepository.createQueryBuilder().delete).toHaveBeenCalled();
      expect(mockNotificationsRepository.createQueryBuilder().delete().from).toHaveBeenCalledWith(Notifications);
      expect(mockNotificationsRepository.createQueryBuilder().delete().from().where).toHaveBeenCalledWith('expireAt <= :expirationDate', { expirationDate: mockExpirationDate });
      expect(mockNotificationsRepository.createQueryBuilder().delete().from().where().execute).toHaveBeenCalled();
      expect(result).toEqual({message:'Se han borrado todas las notificaciones expiradas'})
      })
  })
});

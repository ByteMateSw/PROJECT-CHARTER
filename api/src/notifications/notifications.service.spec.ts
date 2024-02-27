import { Test, TestingModule } from '@nestjs/testing';
import { NotificationsService } from './notifications.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Notifications } from './notifications.entity';
import { CreateNotificationsDTO } from './dto/notification.dto';
import { UserService } from '../user/user.service';
import { User } from "../user/user.entity";
import { Repository } from 'typeorm';

describe('NotificationsService', () => {
  let service: NotificationsService;
  let userService:UserService;

  const mockNotifications = {
    id: 1,
    title: 'Test Notification',
    description: 'Test desc',
    creationTime: new Date(),
    expireAt: new Date(new Date().getTime() + 15 * 24 * 60 * 60 * 1000),
    isDeleted: false,
  };

  const mockNotificationsRepository = {
    create: jest.fn().mockReturnValue(mockNotifications),
    save: jest.fn().mockResolvedValue({ ...mockNotifications }),
    find: jest.fn().mockResolvedValue([mockNotifications]),
    findOne: jest.fn().mockResolvedValue(mockNotifications),
    update: jest.fn().mockResolvedValue(mockNotifications),
    delete: jest.fn().mockResolvedValue(mockNotifications),
  };

  const mockUserService = {
    findOne: jest.fn(),
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NotificationsService,
        {  
          provide: getRepositoryToken(Notifications),
          useValue: mockNotificationsRepository,
        }
        ,{
        provide:UserService,
        useValue:mockUserService,
    },],
    }).compile();
    service = module.get<NotificationsService>(NotificationsService);
    userService = module.get<UserService>(UserService);
  });
  it ('shoul be defined',()=>{
    expect(service). toBeDefined()
  })

  describe('createNotification',()=>{
    it('should create a new notification', async () =>{
        const userId = 1;
        const newNotification:CreateNotificationsDTO = {
        "title": "akjsnfa",
        "description":"asfjn",
        "creationTime":new Date(),
    }
    expect(await service.createNotificacion(userId,newNotification)).toEqual(mockNotifications); 
    expect(mockNotificationsRepository.create).toHaveBeenCalledWith(newNotification);
    expect(mockNotificationsRepository.save).toHaveBeenCalledWith(mockNotifications)
    })
  })

});

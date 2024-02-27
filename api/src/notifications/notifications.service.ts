import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { Repository } from 'typeorm';
import { Notifications } from './notifications.entity';
import { CreateNotificationsDTO } from './dto/notification.dto';
import { Cron, CronExpression } from '@nestjs/schedule';
import { UptadeNotificationsDTO } from './dto/uptadeNotifications.dto';

@Injectable()
export class NotificationsService {
  constructor(
    private NotificationsRepository: Repository<Notifications>,
    private userService: UserService,
  ) {}

  async createNotificacion(
    id: number,
    notificationDto: CreateNotificationsDTO,
  ): Promise<Notifications> {
    const user = await this.userService.getUser({ id });
    const timeStamp = new Date();
    const expireAt = new Date();
    const notifications =
      await this.NotificationsRepository.create(notificationDto);
    notifications.creationTime = timeStamp;
    expireAt.setDate(notifications.expireAt.getDate() + 15);
    notifications.expireAt = expireAt;
    notifications.user = user;
    await this.NotificationsRepository.save(notifications);
    return notifications;
  }

  @Cron(CronExpression.EVERY_DAY_AT_10PM)
  async CleanExpiredNotifications(): Promise<string> {
    const now = new Date();
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() - 15);

    await this.NotificationsRepository.createQueryBuilder()
      .delete()
      .from(Notifications)
      .where('expireAt <= :expirationDate', { expirationDate })
      .execute();
    return 'Se han borrado todas las notificaciones expiradas';
  }

  async getAllActiveNotifications(): Promise<Notifications[]> {
    const ActiveNotif = this.NotificationsRepository.find({
      where: { isDeleted: false },
    });
    return ActiveNotif;
  }

  async getNotificationsById(id: number): Promise<Notifications> {
    const foundNotif = await this.NotificationsRepository.findOneBy({ id });
    return foundNotif;
  }

  async uptadeNotifications(
    id: number,
    uptadeNotifications: UptadeNotificationsDTO,
  ): Promise<Notifications> {
    const notifFound = await this.NotificationsRepository.findOneBy({ id });
    if (!notifFound) throw new Error('La notificación no existe');

    const uptadeNotif = { ...notifFound, ...this.uptadeNotifications };
    await this.NotificationsRepository.save(uptadeNotif);
    return uptadeNotif;
  }

  async deleteNotifications(id: number): Promise<undefined> {
    const notifDelFound = await this.NotificationsRepository.findOneBy({ id });
    if (!notifDelFound) throw new Error('La notificación no existe');

    const deleteNotif = await this.NotificationsRepository.delete(id);
    return undefined;
  }
}

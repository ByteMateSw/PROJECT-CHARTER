import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
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
    try {
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
    } catch (error) {
      console.error('Error al crear la notificación', error.message);
      throw new Error('Error al crear la notificación');
    }
  }

  @Cron(CronExpression.EVERY_DAY_AT_10PM)
  async CleanExpiredNotifications():Promise <string> {
    try {
      const now = new Date();
      const expirationDate = new Date();
      expirationDate.setDate(expirationDate.getDate() - 15);

      await this.NotificationsRepository.createQueryBuilder()
        .delete()
        .from(Notifications)
        .where('expireAt <= :expirationDate', { expirationDate })
        .execute();
        return 'Se han borrado todas las notificaciones expiradas'
    } catch (error) {
      console.error('Error al borrar las notificaciones', error.message);
      throw new Error('Error al borrar las notificaciones');
    }
  }

  async getAllActiveNotifications(): Promise<Notifications[]> {
    try {
      const ActiveNotif = this.NotificationsRepository.find({
        where: { isDeleted: false },
      });
      return ActiveNotif;
    } catch (error) {
      console.error('Error al traer las notificaciones activas', error.message);
      throw new Error('Error al traer las notificaciones activas');
    }
  }

  async getNotificationsById(id:number):Promise<Notifications>{
    try {
        const foundNotif = await this.NotificationsRepository.findOneBy({ id })
        return foundNotif
    } catch (error) {
        console.error('Error al obtener la notificación solicitado', error.message);
        throw new error('Error al obtener la notificación solicitada');
    }
  }

  async uptadeNotifications(
    id: number,
    uptadeNotifications: UptadeNotificationsDTO,
  ): Promise<Notifications> {
    try {
      const notifFound = await this.NotificationsRepository.findOneBy({ id });
      if (!notifFound) throw new Error('La notificación no existe');

      const uptadeNotif = { ...notifFound, ...this.uptadeNotifications };
      await this.NotificationsRepository.save(uptadeNotif);
      return uptadeNotif;
    } catch (error) {
      console.error('La notificación no se ha podido actualizar');
      throw new Error('La notificación no se ha podido actualizar');
    }
  }

  async deleteNotifications(id: number): Promise<undefined> {
    try {
      const notifDelFound = await this.NotificationsRepository.findOneBy({ id });
      if (!notifDelFound) throw new Error('La notificación no existe');

      const deleteNotif = await this.NotificationsRepository.delete(id);
      return undefined;
    } catch (error) {
      console.error('La notificación no se ha podido borrar');
      throw new Error('La notificación no se ha podido borrar');
    }
  }
}

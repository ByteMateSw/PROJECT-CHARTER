import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { Repository, Timestamp } from 'typeorm';
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
    if (!user) throw new NotFoundException('No se ha encontrado el usuario');
    const timeStamp = new Date();
    if (!Timestamp) throw new BadRequestException('No se ha podido crear la fecha');
    const expireAt = new Date();
    if (!expireAt)
      throw new BadRequestException('No se ha podido crear la fecha de expiración');
    const notifications =
      await this.NotificationsRepository.create(notificationDto);
    notifications.creationTime = timeStamp;
    expireAt.setDate(notifications.expireAt.getDate() + 15);
    notifications.expireAt = expireAt;
    notifications.user = user;
    if (!notifications)
      throw new BadRequestException('No se ha podido crear la notificación');
    const saveNotifications =
      await this.NotificationsRepository.save(notifications);
    if (!saveNotifications)
      throw new BadRequestException('No se ha podido guardar la notificación');
    return notifications;
  }

  @Cron(CronExpression.EVERY_DAY_AT_10PM)
  async CleanExpiredNotifications(): Promise<string> {
    const now = new Date();
    if (!now) throw new BadRequestException('No se ha podido crear la fecha');
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() - 15);
    if (!expirationDate)
      throw new BadRequestException(
        'No se ha podido crear la fecha de eliminación de expiracion',
      );

    const deleteNotifications =
      await this.NotificationsRepository.createQueryBuilder()
        .delete()
        .from(Notifications)
        .where('expireAt <= :expirationDate', { expirationDate })
        .execute();
    if (!deleteNotifications)
      throw new BadRequestException('No se ha podido borrar las notificaciones expiradas');
    return 'Se han borrado todas las notificaciones expiradas';
  }

  async getAllActiveNotifications(): Promise<Notifications[]> {
    const ActiveNotif = this.NotificationsRepository.find({
      where: { isDeleted: false },
    });
    if (!ActiveNotif)
      throw new NotFoundException('No se han podido encontrar todas las notificaciones activas',);
    return ActiveNotif;
  }

  async getNotificationsById(id: number): Promise<Notifications> {
    const foundNotif = await this.NotificationsRepository.findOneBy({ id });
    if (!foundNotif)
      throw new NotFoundException('No se han podido encontrar la notificación por ID');
    return foundNotif;
  }

  async uptadeNotifications(
    id: number,
    uptadeNotifications: UptadeNotificationsDTO,
  ): Promise<Notifications> {
    const notifFound = await this.NotificationsRepository.findOneBy({ id });
    if (!notifFound) throw new NotFoundException('La notificación no existe');
    const updateNotif = { ...notifFound, ...this.uptadeNotifications };
    if (!updateNotif) throw new BadRequestException('No se pudo actualizar la calificación');
    const saveNotif = this.NotificationsRepository.save(updateNotif);
    if (!saveNotif)
      throw new BadRequestException('No se pudo guardar la actualización de la calificación');
    return updateNotif;
  }

  async deleteNotifications(id: number): Promise<undefined> {
    const notifDelFound = await this.NotificationsRepository.findOneBy({ id });
    if (!notifDelFound) throw new NotFoundException('La notificación no existe');
    const deleteNotif = await this.NotificationsRepository.delete(id);
    if (deleteNotif.affected === 0)
      throw new BadRequestException('No se pudo borrar la calificación');
    return undefined;
  }
}

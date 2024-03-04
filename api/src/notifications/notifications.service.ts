import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { Repository } from 'typeorm';
import { Notifications } from './notifications.entity';
import { CreateNotificationsDTO } from './dto/notification.dto';
import { Cron, CronExpression } from '@nestjs/schedule';
import { UptadeNotificationsDTO } from './dto/uptadeNotifications.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectRepository(Notifications)
    private notificationsRepository: Repository<Notifications>,
    private userService: UserService,
  ) {}

  /**
   * Creates a new notification for a user.
   * @param id - The ID of the user.
   * @param notificationDto - The data for the notification.
   * @returns A Promise that resolves to the created notification.
   * @throws NotFoundException if the user is not found.
   * @throws BadRequestException if there is an error creating the notification or the expiration date.
   */
  async createNotification(
    id: number,
    notificationDto: CreateNotificationsDTO,
  ): Promise<Notifications> {
    const user = await this.userService.getUser({ id });
    if (!user) {
      throw new NotFoundException('No se ha encontrado el usuario');
    }
    const timeStamp = new Date();
    if (!timeStamp) {
      throw new BadRequestException('No se ha podido crear la fecha');
    }
    const expireAt = new Date();
    if (!expireAt) {
      throw new BadRequestException(
        'No se ha podido crear la fecha de expiración',
      );
    }
    const notifications = this.notificationsRepository.create(notificationDto);
    notifications.creationTime = timeStamp;
    expireAt.setDate(expireAt.getDate() + 15);
    notifications.expireAt = expireAt;
    notifications.user = user;
    if (!notifications) {
      throw new BadRequestException('No se ha podido crear la notificación');
    }
    const saveNotifications =
      await this.notificationsRepository.save(notifications);
    if (!saveNotifications) {
      throw new BadRequestException('No se ha podido guardar la notificación');
    }
    return notifications;
  }

  /**
   * Deletes all expired notifications from the database.
   * Expired notifications are those whose expiration date is earlier than or equal to 15 days ago.
   * @returns A string indicating the success of the operation.
   * @throws {BadRequestException} If there is an error creating the current date or expiration date,
   * or if there is an error deleting the expired notifications.
   */
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

    const deleteNotifications = await this.notificationsRepository
      .createQueryBuilder()
      .delete()
      .from(Notifications)
      .where('expireAt <= :expirationDate', { expirationDate })
      .execute();
    if (!deleteNotifications)
      throw new BadRequestException(
        'No se ha podido borrar las notificaciones expiradas',
      );
    return 'Se han borrado todas las notificaciones expiradas';
  }

  /**
   * Retrieves all active notifications.
   * @returns A promise that resolves to an array of active notifications.
   * @throws `NotFoundException` if no active notifications are found.
   */
  async getAllActiveNotifications(): Promise<Notifications[]> {
    const ActiveNotif = this.notificationsRepository.find({
      where: { isDeleted: false },
    });
    if (!ActiveNotif)
      throw new NotFoundException(
        'No se han podido encontrar todas las notificaciones activas',
      );
    return ActiveNotif;
  }

  /**
   * Retrieves a notification by its ID.
   *
   * @param id - The ID of the notification to retrieve.
   * @returns A Promise that resolves to the found notification.
   * @throws NotFoundException if the notification with the specified ID is not found.
   */
  async getNotificationsById(id: number): Promise<Notifications> {
    const foundNotif = await this.notificationsRepository.findOneBy({ id });
    if (!foundNotif)
      throw new NotFoundException(
        'No se han podido encontrar la notificación por ID',
      );
    return foundNotif;
  }

  /**
   * Updates a notification with the provided ID.
   *
   * @param id - The ID of the notification to update.
   * @param updateNotifications - The data to update the notification with.
   * @returns A Promise that resolves to the updated notification.
   * @throws NotFoundException if the notification with the provided ID does not exist.
   * @throws BadRequestException if the update of the notification fails to save.
   */
  async updateNotifications(
    id: number,
    updateNotifications: UptadeNotificationsDTO,
  ): Promise<Notifications> {
    const notifFound = await this.notificationsRepository.findOneBy({ id });
    if (!notifFound) throw new NotFoundException('La notificación no existe');
    Object.assign(notifFound, updateNotifications);
    const savedNotif = await this.notificationsRepository.save(notifFound);
    if (!savedNotif)
      throw new BadRequestException(
        'No se pudo guardar la actualización de la notificación',
      );
    return savedNotif;
  }

  /**
   * Deletes a notification by its ID.
   * @param id - The ID of the notification to delete.
   * @returns A Promise that resolves to undefined.
   * @throws {NotFoundException} If the notification with the given ID does not exist.
   * @throws {BadRequestException} If the deletion operation fails.
   */
  async deleteNotifications(id: number): Promise<undefined> {
    const notifDelFound = await this.notificationsRepository.findOneBy({ id });
    if (!notifDelFound)
      throw new NotFoundException('La notificación no existe');
    const deleteNotif = await this.notificationsRepository.delete(id);
    if (deleteNotif.affected === 0)
      throw new BadRequestException('No se pudo borrar la calificación');
    return undefined;
  }
}

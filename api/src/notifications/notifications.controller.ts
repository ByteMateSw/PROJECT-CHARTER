import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { CreateNotificationsDTO } from './dto/notification.dto';
import { UptadeNotificationsDTO } from './dto/uptadeNotifications.dto';

/**
 * Controller for handling notifications-related operations.
 */
@Controller('notifications')
export class NotificationsController {
  constructor(private notificationsService: NotificationsService) {}

  /**
   * Creates notifications.
   *
   * @param id - The ID of the notification.
   * @body notificationDto - The data for creating the notification.
   * @returns A promise that resolves to the created notification.
   * @throws HttpException if there is an error creating the notification.
   */
  @Post('create')
  async createNotifications(
    @Query('id') id: number,
    @Query('contractor') contractor: number,
    @Body() notificationDto: CreateNotificationsDTO,
  ) {
    try {
      return await this.notificationsService.createNotification(
        id,
        contractor,
        notificationDto,
      );
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * Deletes expired notifications.
   * @returns A promise that resolves to a string.
   * @throws HttpException if there is an error deleting the notifications.
   */
  @Delete('deleteNotif')
  async CleanExpiredNotifications(): Promise<string> {
    try {
      await this.notificationsService.CleanExpiredNotifications();
      return 'Las notificaciones expiradas han sido borradas con éxito';
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * Retrieves all active notifications.
   * @returns A promise that resolves to a string.
   * @throws HttpException if there is an error retrieving the notifications.
   */
  @Get('all')
  async GetAllActiveNotifications(): Promise<string> {
    try {
      await this.notificationsService.getAllActiveNotifications();
      return 'Se han traido todas las notificaciones';
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * Retrieves a notification by its ID.
   * @param id - The ID of the notification.
   * @returns A promise that resolves to a string.
   * @throws HttpException if there is an error retrieving the notification.
   */
  @Get('byId')
  async GetNotificationsById(@Body('id') id: number): Promise<string> {
    try {
      await this.notificationsService.getNotificationsById(id);
      return 'Se ha traido la notificación';
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  /**
   * Updates a notification.
   * @param id - The ID of the notification.
   * @param UptadeNotificationsDTO - The data to update the notification with.
   * @returns A promise that resolves to a string.
   * @throws HttpException if there is an error updating the notification.
   */
  @Put('id')
  async uptadeNotifications(
    @Param('id') id: number,
    @Body() UptadeNotificationsDTO,
  ) {
    try {
      await this.notificationsService.updateNotifications(
        id,
        UptadeNotificationsDTO,
      );
      return 'Se ha actualizado de manera correcta la notificación';
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * Deletes a notification by its ID.
   * @param id - The ID of the notification.
   * @returns A promise that resolves to a string.
   * @throws HttpException if there is an error deleting the notification.
   */
  @Delete(':id')
  async deleteNotifications(id: number): Promise<string> {
    try {
      await this.notificationsService.deleteNotifications(id);
      return 'Se ha borrado correctamente';
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}

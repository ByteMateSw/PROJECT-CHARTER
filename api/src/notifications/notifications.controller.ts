import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { CreateNotificationsDTO } from './dto/notification.dto';
import { UptadeNotificationsDTO } from './dto/uptadeNotifications.dto';

@Controller('Notifications')
export class NotificationsController {
  constructor(private notificationsService: NotificationsService) {}

  @Post('create')
  async createNotifications(
    @Body() id: number,
    notificationDto: CreateNotificationsDTO,
  ) {
    try {
      return await this.notificationsService.createNotification(
        id,
        notificationDto,
      );
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete('deleteNotif')
  async CleanExpiredNotifications():Promise<string>{
    try {
      await this.notificationsService.CleanExpiredNotifications()
      return 'Las notificaciones expiradas han sido borradas con éxito'
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('all')
  async GetAllActiveNotifications():Promise<string>{
    try {
      await this.notificationsService.getAllActiveNotifications()
      return 'Se han traido todas las notificaciones'
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('byId')
  async GetNotificationsById(@Body('id') id:number):Promise<string>{
    try {
     await this.notificationsService.getNotificationsById(id)
     return 'Se ha traido la notificación' 
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @Put('id')
  async uptadeNotifications(@Param('id') id:number, @Body() UptadeNotificationsDTO){
    try {
      await this.notificationsService.updateNotifications(
        id,
        UptadeNotificationsDTO
      )
      return 'Se ha actualizado de manera correcta la notificación'
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id')
  async deleteNotifications(id: number):Promise<string>{
    try {
      await this.notificationsService.deleteNotifications(id)
      return 'Se ha borrado correctamente'
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}

 

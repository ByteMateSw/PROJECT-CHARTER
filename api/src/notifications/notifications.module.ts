import { TypeOrmModule } from "@nestjs/typeorm";
import { Notifications } from "./notifications.entity";
import { NotificationsController } from "./notifications.controller";
import { NotificationsService } from "./notifications.service";
import { Module } from "@nestjs/common";

@Module({
    imports: [TypeOrmModule.forFeature([Notifications])],
    controllers: [NotificationsController],
    providers: [NotificationsService],
  })
  export class NotificationModule {}
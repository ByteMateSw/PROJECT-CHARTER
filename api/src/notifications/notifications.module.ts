import { TypeOrmModule } from "@nestjs/typeorm";
import { Notifications } from "./notifications.entity";
import { NotificationsController } from "./notifications.controller";
import { NotificationsService } from "./notifications.service";
import { Module } from "@nestjs/common";
import { UserModule } from "../user/user.module";

/**
 * Represents the Notifications module of the application.
 * This module is responsible for importing the necessary dependencies,
 * defining the controllers, providers, and exports for the Notifications feature.
 */
@Module({
    imports: [TypeOrmModule.forFeature([Notifications]),UserModule],
    controllers: [NotificationsController],
    providers: [NotificationsService],
  })
  export class NotificationModule {}
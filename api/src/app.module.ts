import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from './config/typeorm.config';
import { UserModule } from './user/user.module';
import { OfficeModule } from './office/office.module';
import { AuthModule } from './auth/auth.module';
import { ProvinceModule } from './province/province.module';
import { CityModule } from './city/city.module';
import { StateHiringModule } from './hiring/state/stateHiring.module';
import { HiringModule } from './hiring/hiring.module';
import { PostModule } from './post/post.module';
import { ConfigurationModule } from './config/config.module';
import { MailerModule } from './mailer/mailer.module';
import { ReviewModule } from './review/review.module';
import { NotificationModule } from './notifications/notifications.module';
import { AppController } from './app.controller';
import { S3Module } from './storage/s3.module';
import { ExperienceModule } from './experiencie/experience.module';

@Module({
  imports: [
    ConfigurationModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useClass: TypeOrmConfigService,
    }),
    AuthModule,
    UserModule,
    ProvinceModule,
    CityModule,
    OfficeModule,
    StateHiringModule,
    HiringModule,
    PostModule,
    MailerModule,
    ReviewModule,
    NotificationModule,
    S3Module,
    ExperienceModule,
  ],
  controllers: [AppController],
})
export class AppModule {}

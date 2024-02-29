import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from './config/typeorm.config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { CategoryModule } from './category/category.module';
import { OfficeModule } from './office/office.module';
import { AuthModule } from './auth/auth.module';
import { ProvinceModule } from './province/province.module';
import { CityModule } from './city/city.module';
import { StateHiringModule } from './hiring/state/stateHiring.module';
import { HiringModule } from './hiring/hiring.module';
import { PostModule } from './post/post.module';
import { ConfigurationModule } from './config/config.module';
import { MembershipModule } from './membership/membership.module';
import { MailerService } from './mailer/mailer.service';
import { MailerModule } from './mailer/mailer.module';

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
    CategoryModule,
    ProvinceModule,
    CityModule,
    OfficeModule,
    StateHiringModule,
    HiringModule,
    PostModule,
    MembershipModule,
    MailerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

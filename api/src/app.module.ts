import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import databaseConfig from './config/database.config';
import jwtConfig from './config/jwt.config';
import appConfig from './config/app.config';
import { TypeOrmConfigService } from './config/typeorm.config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { CategoryModule } from './category/category.module';
import { OfficeModule } from './office/office.module';
import { AuthModule } from './auth/auth.module';
import { ProvinceModule } from './province/province.module';
import { CityModule } from './city/city.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [databaseConfig, jwtConfig, appConfig],
      cache: true,
    }),
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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

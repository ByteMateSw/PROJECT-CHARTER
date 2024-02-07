import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './user/user.entity';
import { Office } from './office/Office.entity';
import { Category } from './category/Category.entity';
import { Hiring } from './hiring/Hiring.entity';
import { Review } from './review/Review.entity';
import { UserModule } from './user/user.module';
import { Province } from './province/province.entity';
import { City } from './city/city.entity';
import { CategoryModule } from './category/category.module';
import { ProvinceModule } from './province/province.module';
import { CityModule } from './city/city.module';

require('dotenv').config();
const {
  DATABASE_NAME,
  DATABASE_USER,
  DATABASE_PASSWORD,
  DATABASE_HOST,
  DATABASE_PORT,
} = process.env;

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: DATABASE_HOST,
      port: parseInt(DATABASE_PORT),
      username: DATABASE_USER,
      password: DATABASE_PASSWORD,
      database: DATABASE_NAME,
      synchronize: true,
      logging: false,
      entities: [User, Province, Office, Category, Hiring, Review, City],
      migrations: [],
      subscribers: [],
    }),
    UserModule,
    CategoryModule,
    ProvinceModule,
    CityModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

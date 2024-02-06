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
import { Localization } from './location/localization.entity';
import { LocalizationModule } from './location/localization.module';

require('dotenv').config();
const {
  DATABASE_NAME,
  DATABASE_USER,
  DATABASE_PASSWORD,
  DATABASE_HOST,
  DATABASE_PORT,
} = process.env;

console.log(
  DATABASE_NAME,
  DATABASE_USER,
  DATABASE_PASSWORD,
  DATABASE_HOST,
  DATABASE_PORT,
);

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
      entities: [User, Office, Category, Hiring, Review, Localization],
      migrations: [],
      subscribers: [],
    }),
    UserModule,
    LocalizationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

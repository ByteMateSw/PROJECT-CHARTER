import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Role } from '../role/role.entity';
import { UserRepository } from './repository/user.repository';
import { S3Module } from 'src/storage/s3.module';
import { City } from 'src/city/city.entity';

/**
 * Represents the User module of the application.
 * This module is responsible for importing the necessary dependencies,
 * defining the controllers, providers, and exports for the User feature.
 */
@Module({
  imports: [
    TypeOrmModule.forFeature([User, Role, City, UserRepository]),
    S3Module,
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}

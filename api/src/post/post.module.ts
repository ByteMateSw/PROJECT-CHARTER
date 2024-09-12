import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './post.entity';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { ImagePost } from '../image/imagePost.entity';
import { UserModule } from '../user/user.module';
import { S3Module } from 'src/storage/s3.module';
import { CityModule } from 'src/city/city.module';
import { City } from 'src/city/city.entity';

/**
 * Represents the Post module of the application.
 * This module is responsible for importing the necessary dependencies,
 * defining the controllers, providers, and exports for the Post feature.
 */
@Module({
  imports: [
    TypeOrmModule.forFeature([Post, ImagePost, City]),
    UserModule,
    CityModule,
    S3Module,
  ],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}

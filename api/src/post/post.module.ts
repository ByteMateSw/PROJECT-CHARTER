import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './post.entity';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { ImagePost } from '../image/imagePost.entity';
import { UserModule } from '../user/user.module';

/**
 * Represents the Post module of the application.
 * This module is responsible for importing the necessary dependencies,
 * defining the controllers, providers, and exports for the Post feature.
 */
@Module({
  imports: [TypeOrmModule.forFeature([Post, ImagePost]), UserModule],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}

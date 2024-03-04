import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './post.entity';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { ImagePost } from '../image/imagePost.entity';
import { UserModule } from '../user/user.module';

/**
 * Module responsible for post-related functionality.
 */
@Module({
  imports: [TypeOrmModule.forFeature([Post, ImagePost]), UserModule],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}

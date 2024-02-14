import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './post.entity';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { ImagePost } from 'src/image/imagePost.entity';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Post, ImagePost]), UserModule],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}

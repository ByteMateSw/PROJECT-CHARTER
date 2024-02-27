import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { PostService } from './post.service';
import { Post as PostEntity } from './post.entity';
import { CreatePostDto } from './dto/createPost.dto';
import { UptadePostDto } from './dto/uptadePost.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { AccessTokenGuard } from '../auth/jwt/access.guard';
import { UserParamID } from '../utils/params/user.param';
import { CustomParseIntPipe } from '../utils/pipes/parse-int.pipe';
import { FilePipeValidator } from '../utils/pipes/file-validator.pipe';
import { File } from '../utils/types/functions.type';
import { InfoParam } from '../utils/params/info.param';
import { EmptyBodyPipe } from 'src/utils/pipes/empty-body.pipe';

@Controller('posts')
export class PostController {
  constructor(private postService: PostService) {}

  @Get()
  async getAllPosts(): Promise<PostEntity[]> {
    return await this.postService.getAllPosts();
  }

  @UseGuards(AccessTokenGuard)
  @Get(':id')
  async getPostById(@Param(':id', ParseIntPipe) id: number) {
    return await this.postService.getPostBy({ id });
  }

  @UseGuards(AccessTokenGuard)
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(FilesInterceptor('images'))
  @Post()
  async createPost(
    @InfoParam() createPostDto: CreatePostDto,
    @UserParamID(CustomParseIntPipe) userId: number,
    @UploadedFiles(FilePipeValidator) images: File[],
  ) {
    const newPost = await this.postService.createPost(userId, createPostDto);
    await this.postService.addImagesToPost(newPost.id, images);
    return newPost;
  }

  @UseGuards(AccessTokenGuard)
  @Post('images/:id')
  @UseInterceptors(FilesInterceptor('images', 1))
  async addImageToPost(
    @Param('id', CustomParseIntPipe) postId: number,
    @UploadedFiles(FilePipeValidator) images: File[],
  ) {
    return await this.postService.addImagesToPost(postId, images);
  }

  @UseGuards(AccessTokenGuard)
  @Delete('images/:id')
  async removeImageFromPost(@Param('id', CustomParseIntPipe) imageId: number) {
    return await this.postService.removeImageFromPost(imageId);
  }

  @UseGuards(AccessTokenGuard)
  @UseInterceptors(FilesInterceptor('images'))
  @Put(':id')
  async uptadePost(
    @Param('id') id: number,
    @Body(EmptyBodyPipe) UptadePostDto: UptadePostDto,
  ) {
    await this.postService.uptadePost(id, UptadePostDto);
    return 'La publicación se actualizó correctamente';
  }

  @UseGuards(AccessTokenGuard)
  @Delete(':id')
  async deletePost(@Param('id', CustomParseIntPipe) postId: number) {
    await this.postService.deletePost(postId);
    return 'La publicación se ha borrado correctamente';
  }

  @Get(':search')
  async getPostByName(title: string): Promise<string> {
    try {
      await this.postService.getPostBy({ title });
      return 'Se han encontrado las siguientes publicaciones';
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }
}

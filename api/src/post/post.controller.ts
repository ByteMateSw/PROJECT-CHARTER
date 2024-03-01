import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { PostService } from './post.service';
import { Post as PostEntity } from './post.entity';
import { CreatePostDto } from './dto/createPost.dto';
import { UpdatePostDto } from './dto/updatePost.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { AccessTokenGuard } from '../auth/jwt/access.guard';
import { UserParamID } from '../utils/params/user.param';
import { CustomParseIntPipe } from '../utils/pipes/parse-int.pipe';
import { FilePipeValidator } from '../utils/pipes/file-validator.pipe';
import { File, ResponseMessage } from '../utils/types/functions.type';
import { InfoParam } from '../utils/params/info.param';
import { EmptyBodyPipe } from '../utils/pipes/empty-body.pipe';
import { QueryNumberPipe } from '../utils/pipes/query-number.pipe';
import { ImagePost } from '../image/imagePost.entity';

@Controller('posts')
export class PostController {
  constructor(private postService: PostService) {}

  @Get()
  async getAllPosts(): Promise<PostEntity[]> {
    return await this.postService.getAllPosts();
  }

  @Get('search')
  async getPostByName(
    @Query('v') query: string,
    @Query('page', QueryNumberPipe) page: number,
    @Query('limit', QueryNumberPipe) limit: number,
  ): Promise<PostEntity[]> {
    return await this.postService.searchPost(query, page, limit);
  }

  @UseGuards(AccessTokenGuard)
  @Get(':id')
  async getPostById(
    @Param(':id', ParseIntPipe) id: number,
  ): Promise<PostEntity> {
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
  ): Promise<PostEntity> {
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
  ): Promise<ImagePost[]> {
    return await this.postService.addImagesToPost(postId, images);
  }

  @UseGuards(AccessTokenGuard)
  @Delete('images/:id')
  async removeImageFromPost(
    @Param('id', CustomParseIntPipe) imageId: number,
  ): Promise<ResponseMessage> {
    await this.postService.removeImageFromPost(imageId);
    return { message: 'La imagen se ha borrado correctamente' };
  }

  @UseGuards(AccessTokenGuard)
  @UseInterceptors(FilesInterceptor('images'))
  @Put(':id')
  async updatePost(
    @Param('id') id: number,
    @Body(EmptyBodyPipe) updatePostDto: UpdatePostDto,
  ): Promise<ResponseMessage> {
    await this.postService.updatePost(id, updatePostDto);
    return { message: 'La publicación se actualizó correctamente' };
  }

  @UseGuards(AccessTokenGuard)
  @Delete(':id')
  async deletePost(
    @Param('id', CustomParseIntPipe) postId: number,
  ): Promise<ResponseMessage> {
    await this.postService.deletePost(postId);
    return { message: 'La publicación se ha borrado correctamente' };
  }
}

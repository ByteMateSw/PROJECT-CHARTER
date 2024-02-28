import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { PostService } from './post.service';
import { Post as PostEntity } from './post.entity';
import { CreatePostDto } from './dto/createPost.dto';
import { UpdatePostDto } from './dto/updatePost.dto';
import { updateCategoryDto } from 'src/category/dto/updateCategory.dto';
import { title } from 'process';

@Controller()
export class PostController {
  constructor(private postService: PostService) { }

  @Get()
  async getAllPosts(): Promise<PostEntity[]> {
    try {
      return await this.postService.getAllPosts();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @Get(':id')
  async getPostById(@Param(':id', ParseIntPipe) id: number) {
    try {
      return await this.postService.getPostById(id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @Post('create')
  async createPost(
    @Body() userId: number,
    createPostDto: CreatePostDto,
    imageDataArray: Buffer[],
  ) {
    try {
      return await this.postService.createPost(
        userId,
        createPostDto,
        imageDataArray,
      );
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('addImg')
  async addImageToPost(@Body()
  postId: number,
    imageDataArray: Buffer[]) {
    try {
      return await this.postService.addImagesToPost(
        postId,
        imageDataArray
      )
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
    }
  }

  @Delete('delImg')
  async removeImageFromPost(@Body()
  postId: number,
    imagePostId: number) {
    try {
      return await this.postService.removeImageFromPost(
        postId,
        imagePostId
      )
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
    }
  }

  @Put(':id')
  async updatePost(@Param('id') id: number, @Body() UpdatePostDto: UpdatePostDto) {
    try {
      await this.postService.updatePost(id, UpdatePostDto)
      return "La publicación se actualizó correctamente"
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
    }

  }

  @Delete(':id')
  async deletePost(@Body('id') postId: number) {
    try {
      await this.postService.deletePost(postId)
      return "La publicación se ha borrado correctamente"
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
    }
  }

  @Get(':search')
  async getPostByName(title: string):Promise<string> {
    try {
      await this.postService.getPostByName(title)
      return "Se han encontrado las siguientes publicaciones"
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND)
    }
  }
}

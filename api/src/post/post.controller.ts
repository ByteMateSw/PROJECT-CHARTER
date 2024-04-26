import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
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

  /**
   * Retrieves all posts.
   * @returns A promise that resolves to an array of PostEntity objects.
   */
  @Get()
  async getAllPosts(): Promise<PostEntity[]> {
    return await this.postService.getAllPosts();
  }

  /**
   * Retrieves posts by name based on the provided query, page, and limit.
   *
   * @param query - The search query for post names.
   * @param page - The page number for pagination.
   * @param limit - The maximum number of posts to retrieve per page.
   * @returns A promise that resolves to an array of PostEntity objects.
   */
  @Get('search')
  async getPostByName(
    @Query('v') query: string,
    @Query('page', QueryNumberPipe) page: number,
    @Query('limit', QueryNumberPipe) limit: number,
  ): Promise<PostEntity[]> {
    return await this.postService.searchPost(query, page, limit);
  }

  /**
   * Retrieves a post by its ID.
   *
   * @param id - The ID of the post to retrieve.
   * @returns A promise that resolves to a PostEntity object.
   */
  @UseGuards(AccessTokenGuard)
  @Get(':id')
  async getPostById(
    @Param('id', CustomParseIntPipe) id: number,
  ): Promise<PostEntity> {
    return await this.postService.getPostBy({ id });
  }

  /**
   * Creates a new post.
   *
   * @param createPostDto - The data transfer object containing the details of the post to be created.
   * @param userId - The ID of the user creating the post.
   * @param images - An array of files representing the images to be associated with the post.
   * @returns A Promise that resolves to the newly created post entity.
   */
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
    if (images.length > 0)
      await this.postService.addImagesToPost(newPost.id, images);
    return newPost;
  }

  /**
   * Adds images to a post.
   *
   * @param postId - The ID of the post.
   * @param images - An array of files representing the images to be added.
   * @returns A promise that resolves to an array of ImagePost objects.
   */
  @UseGuards(AccessTokenGuard)
  @Post('images/:id')
  @UseInterceptors(FilesInterceptor('images'))
  async addImageToPost(
    @Param('id', CustomParseIntPipe) postId: number,
    @UploadedFiles(FilePipeValidator) images: File[],
  ): Promise<ImagePost[]> {
    return await this.postService.addImagesToPost(postId, images);
  }

  /**
   * Removes an image from a post.
   *
   * @param imageId - The ID of the image to be removed.
   * @returns A Promise that resolves to a ResponseMessage indicating the success of the operation.
   */
  @UseGuards(AccessTokenGuard)
  @Delete('images/:id')
  async removeImageFromPost(
    @Param('id', CustomParseIntPipe) imageId: number,
  ): Promise<ResponseMessage> {
    await this.postService.removeImageFromPost(imageId);
    return { message: 'La imagen se ha borrado correctamente' };
  }

  /**
   * Updates a post with the specified ID.
   *
   * @param id - The ID of the post to update.
   * @param updatePostDto - The data to update the post with.
   * @returns A Promise that resolves to a ResponseMessage indicating the success of the update operation.
   */
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

  /**
   * Deletes a post with the specified ID.
   *
   * @param id - The ID of the post to delete.
   * @returns A Promise that resolves to a ResponseMessage indicating the success of the deletion.
   */
  @UseGuards(AccessTokenGuard)
  @Delete(':id')
  async deletePost(
    @Param('id', CustomParseIntPipe) postId: number,
  ): Promise<ResponseMessage> {
    await this.postService.deletePost(postId);
    return { message: 'La publicación se ha borrado correctamente' };
  }
}

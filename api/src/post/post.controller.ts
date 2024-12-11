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
  Patch,
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
import { FilesNamePipe, FilePipeValidator } from '../utils/pipes/file.pipe';
import { File } from '../utils/types/functions.type';
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
    @Query('location') location: string,
    @Query('habilities') habilities: string,
    @Query('page', QueryNumberPipe) page: number,
    @Query('limit', QueryNumberPipe) limit: number,
  ): Promise<{ count: number; posts: PostEntity[] }> {
    return await this.postService.searchPost(habilities, location, page, limit);
  }

  @Get('userName')
  async getPostsByUserName(@Param('userName') userName: string) {
    return await this.postService.getPostsByUserName(userName);
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
  //@UseGuards(AccessTokenGuard)
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(FilesInterceptor('images'))
  @Post('/:userId')
  async createPost(
    @Body() createPostDto: CreatePostDto,
    @Param('userId') userId: number,
    //@UploadedFiles(FilePipeValidator, FilesNamePipe) images?: File[],
  ): Promise<PostEntity> {
    const newPost = await this.postService.createPost(userId, createPostDto);
    // if (images.length > 0)
    //   await this.postService.addImagesToPost(newPost.id, images);
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
    @UploadedFiles(FilePipeValidator, FilesNamePipe) images: File[],
  ): Promise<ImagePost[]> {
    return await this.postService.addImagesToPost(postId, images);
  }

  /**
   * Removes an image from a post.
   *
   * @param imageId - The ID of the image to be removed.
   */
  @UseGuards(AccessTokenGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('images/:id')
  async removeImageFromPost(
    @Param('id', CustomParseIntPipe) imageId: number,
  ): Promise<void> {
    await this.postService.removeImageFromPost(imageId);
  }

  /**
   * Updates a post with the specified ID.
   *
   * @param id - The ID of the post to update.
   * @param updatePostDto - The data to update the post with.
   * @returns - The data to update the post with.
   */
  @UseGuards(AccessTokenGuard)
  @UseInterceptors(FilesInterceptor('images'))
  @Put(':id')
  async updatePost(
    @Param('id') id: number,
    @Body(EmptyBodyPipe) updatePostDto: UpdatePostDto,
  ): Promise<PostEntity> {
    return await this.postService.updatePost(id, updatePostDto);
  }

  /**
   * Apply for the job
   *
   * @param userId - id of apply user
   * @param postId - post id you are applying for
   * @return - The apply data
   */
  //@UseGuards(AccessTokenGuard)
  @Patch('apply')
  async subscribePost(
    @Query('userId') userId: number,
    @Query('postId') postId: number,
  ) {
    return await this.postService.subscribePost(postId, userId);
  }

  /**
   * Deletes a post with the specified ID.
   *
   * @param id - The ID of the post to delete.
   */
  @UseGuards(AccessTokenGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async deletePost(
    @Param('id', CustomParseIntPipe) postId: number,
  ): Promise<void> {
    await this.postService.deletePost(postId);
  }
}

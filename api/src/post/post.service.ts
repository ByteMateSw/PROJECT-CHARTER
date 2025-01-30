import {
  Injectable,
  NotFoundException,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './post.entity';
import { ImagePost } from '../image/imagePost.entity';
import { CreatePostDto } from './dto/createPost.dto';
import { UserService } from '../user/user.service';
import { UpdatePostDto } from './dto/updatePost.dto';
import { File, TitleAndOrId } from '../utils/types/functions.type';
import { S3Service } from 'src/storage/s3.service';
import { CityService } from 'src/city/city.service';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post) private postRepository: Repository<Post>,
    @InjectRepository(ImagePost)
    private imagePostRepository: Repository<ImagePost>,
    private userService: UserService,
    private cityService: CityService,
    private s3Service: S3Service,
  ) {}

  /**
   * Retrieves all posts from the database.
   * @returns A promise that resolves to an array of Post objects.
   * @throws NotFoundException if no posts are found.
   */
  async getAllPosts(): Promise<Post[]> {
    const allPosts = await this.postRepository.find({
      where: { user: { isDeleted: false } },
    });
    if (!allPosts)
      throw new NotFoundException('No se ha podido traer todos los post');
    return allPosts;
  }

  /**
   * Retrieves a post by its ID and/or title.
   *
   * @param {TitleAndOrId} options - The options to filter the post by.
   * @returns {Promise<Post>} - The post that matches the given options.
   * @throws {NotFoundException} - If no post is found.
   */
  async getPostBy({ id, title }: TitleAndOrId): Promise<Post> {
    const findedPost = await this.postRepository.findOne({
      where: { id, title, user: { isDeleted: false } },
      relations: { images: true },
    });
    if (!findedPost)
      throw new NotFoundException('No se ha podido traer el post');
    findedPost.images.map((image) => {
      image.path = this.s3Service.getURLFile(image.path);
    });
    return findedPost;
  }

  /**
   * Creates a new post for a user.
   *
   * @param userId - The ID of the user who is creating the post.
   * @param postDto - The data for the new post.
   * @returns A Promise that resolves to the created post.
   * @throws NotFoundException if the user is not found.
   */
  async createPost(userId: number, postDto: CreatePostDto): Promise<Post> {
    const user = await this.userService.getUserBy({ id: userId });
    if (!user) throw new NotFoundException('No se ha encontrado el usuario');
    const newPost = this.postRepository.create(postDto);
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 10);
    newPost.user = user;
    newPost.endPostDate = currentDate;
    return await this.postRepository.save(newPost);
  }

  /**
   * Adds images to a post.
   *
   * @param postId - The ID of the post.
   * @param images - An array of File objects representing the images to be added.
   * @returns A Promise that resolves to an array of ImagePost objects representing the added images.
   * @throws NotFoundException if the post with the given ID is not found.
   */
  async addImagesToPost(postId: number, images: File[]): Promise<ImagePost[]> {
    const post = await this.getPostBy({ id: postId });
    if (!post) throw new NotFoundException('No se ha encontrado el post');
    return Promise.all(
      images.map(async (image) => {
        const path = await this.s3Service.uploadFile(
          image.originalname,
          `posts/${postId}`,
          image.mimetype,
          image.buffer,
        );
        const newImage = this.imagePostRepository.create({
          path,
          post,
        });
        await this.imagePostRepository.save(newImage);
        return newImage;
      }),
    );
  }

  /**
   * Removes an image post from the database.
   *
   * @param imagePostId - The ID of the image post to be removed.
   * @returns A Promise that resolves to the removed ImagePost object.
   * @throws NotFoundException if the image post with the given ID is not found.
   */
  async removeImageFromPost(imagePostId: number): Promise<ImagePost> {
    const imagePost = await this.imagePostRepository.findOne({
      where: { id: imagePostId },
    });
    if (!imagePost) throw new NotFoundException('Imágen no encontrada');
    await this.s3Service.removeFile(imagePost.path);
    return this.imagePostRepository.remove(imagePost);
  }

  /**
   * Updates a post with the provided data.
   *
   * @param postId - The ID of the post to update.
   * @param updatePostData - The data to update the post with.
   * @returns A Promise that resolves to the updated post.
   * @throws NotFoundException if the post with the given ID does not exist.
   */
  async updatePost(
    postId: number,
    updatePostData: UpdatePostDto,
  ): Promise<Post> {
    const postFound = await this.postRepository.findOneBy({ id: postId });
    if (!postFound) throw new NotFoundException('La publicación no existe');
    const updatePost = { ...postFound, ...updatePostData };
    return await this.postRepository.save(updatePost);
  }

  /**
   * Deletes a post by its ID.
   * @param postId - The ID of the post to delete.
   * @throws NotFoundException if the post with the given ID does not exist.
   */
  async deletePost(postId: number) {
    const postDelFound = await this.postRepository.findOne({
      where: { id: postId },
      relations: { images: true },
    });
    if (!postDelFound) throw new NotFoundException('La publicacion no existe');
    if (postDelFound.images.length > 0)
      Promise.all(
        postDelFound.images.map(async (image) => {
          await this.s3Service.removeFile(image.path);
          await this.imagePostRepository.remove(image);
        }),
      );
    await this.postRepository.remove(postDelFound);
  }

  /**
   * Checks if a post with the given ID exists.
   * @param id - The ID of the post to check.
   * @returns A Promise that resolves to a boolean indicating whether the post exists.
   */
  async existsPost(id: number): Promise<boolean> {
    return await this.postRepository.existsBy({ id });
  }

  /**
   * Searches for posts based on the provided query string.
   *
   * @param query - The search query string.
   * @param page - The page number for pagination.
   * @param limit - The maximum number of posts to return per page.
   * @returns A promise that resolves to an array of Post objects matching the search query.
   */
  async searchPost(
    habilities: string,
    location: string,
    page: number,
    limit: number,
    professions: string,
  ): Promise<{ count: number; posts: Post[] }> {
    const profParse = JSON.parse(professions);
    const queryPost = this.postRepository.createQueryBuilder('post');
    queryPost.leftJoinAndSelect('post.user', 'user');
    queryPost.leftJoinAndSelect('post.city', 'city');
    queryPost.where('post.endPostDate > :actualDate', {
      actualDate: new Date(),
    });
    const postCount = await this.postRepository.count();

    if (habilities) {
      queryPost.where('LOWER(post.title) LIKE LOWER(:title)', {
        title: `%${habilities}%`,
      });
    }
    if (location) {
      queryPost.andWhere('city.name = :name', {
        name: location,
      });
    }
    if (profParse.length > 0) {
      queryPost.andWhere('post.searchVector IN (:...professions)', {
        professions: profParse,
      });
    }
    // queryPost
    //   .andWhere('user.isDeleted = :isDeleted', { isDeleted: false })
    //   .orderBy('ts_rank("searchVector", websearch_to_tsquery(:query))', 'DESC');
    const posts = await queryPost.skip(page).take(limit).getMany();
    return {
      count: postCount,
      posts,
    };
  }

  async subscribePost(postId: number, userId: number) {
    const user = await this.userService.getUserById(userId);
    if (!user) throw new NotFoundException('usuario no existe');
    const post = await this.postRepository.findOne({
      where: { id: postId },
      relations: ['subscribers'],
    });
    if (!post) throw new NotFoundException('trabajo no encontrado');
    if (post.subscribers.find((e) => e.id === user.id) != undefined) {
      throw new HttpException(
        'Ya postulaste a este trabajo',
        HttpStatus.CONFLICT,
      );
    }
    post.subscribers.push(user);
    return this.postRepository.save(post);
  }

  async getPostsByUserName(userName: string): Promise<Post[]> {
    const posts = await this.postRepository.find({
      relations: { user: true },
      where: { user: { username: userName } },
    });
    return posts;
  }
}

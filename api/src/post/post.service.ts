import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './post.entity';
import { ImagePost } from '../image/imagePost.entity';
import { CreatePostDto } from './dto/createPost.dto';
import { UserService } from '../user/user.service';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post) private postRepository: Repository<Post>,
    @InjectRepository(ImagePost)
    private imagePostRepository: Repository<ImagePost>,
    private userService: UserService,
  ) {}

  async getAllPosts(): Promise<Post[]> {
    try {
      const allPosts = await this.postRepository.find();
      return allPosts;
    } catch (error) {
      console.error('Error al obtener los posts', error.message);
      throw new error('Error al obtener los posts');
    }
  }

  async getPostById(id: number): Promise<Post> {
    try {
      const findedPost = await this.postRepository.findOneByOrFail({ id });
      return findedPost;
    } catch (error) {
      console.error('Error al obtener el post solicitado', error.message);
      throw new error('Error al obtener el post solicitado');
    }
  }

  async createPost(
    userId: number,
    postDto: CreatePostDto,
    imageDataArray: Buffer[],
  ): Promise<Post> {
    try {
      const user = await this.userService.getUserById(userId);
      const date: Date = new Date();
      const newPost = this.postRepository.create(postDto);
      newPost.creationDate = date;
      newPost.user = user;
      await this.postRepository.save(newPost);
      const imagePosts = imageDataArray.map((imageData) =>
        this.imagePostRepository.create({ imageData, post: newPost }),
      );
      await this.imagePostRepository.save(imagePosts);
      return newPost;
    } catch (error) {
      console.error('Error al crear el post', error.message);
      throw new Error('Error al crear el post');
    }
  }

  async addImagesToPost(
    postId: number,
    imageDataArray: Buffer[],
  ): Promise<Post> {
    try {
      const post = await this.getPostById(postId);
      const imagePosts = imageDataArray.map((imageData) =>
        this.imagePostRepository.create({ imageData, post }),
      );
      await this.imagePostRepository.save(imagePosts);
      post.images = [...post.images, ...imagePosts];
      return await this.postRepository.save(post);
    } catch (error) {
      console.error('Error al añadir imágenes', error.message);
      throw new Error('Error al añadr imágenes');
    }
  }

  async removeImageFromPost(
    postId: number,
    imagePostId: number,
  ): Promise<Post> {
    try {
      const post = await this.getPostById(postId);
      const imagePost = await this.imagePostRepository.findOneOrFail({
        where: { id: imagePostId },
      });
      post.images = post.images.filter((image) => image.id !== imagePost.id);
      await this.imagePostRepository.remove(imagePost);
      return await this.postRepository.save(post);
    } catch (error) {
      console.error('Error al remover una imágen', error.message);
      throw new Error('Error al remover una imágen');
    }
  }

}

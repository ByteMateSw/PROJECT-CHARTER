import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './post.entity';
import { Repository } from 'typeorm';
import { ImagePost } from 'src/image/imagePost.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post) private postRepository: Repository<Post>,
    @InjectRepository(ImagePost)
    private imagePostRepository: Repository<ImagePost>,
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

  async createPost(post: Post, imageDataArray: Buffer[]): Promise<Post> {
    try {
      const date: Date = new Date();
      post.creationDate = date;
      const newPost = await this.postRepository.save(post);
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

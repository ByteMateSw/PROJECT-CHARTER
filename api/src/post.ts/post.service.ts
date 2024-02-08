import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './post.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post) private postRepository: Repository<Post>,
  ) {}

  async getAllPosts(): Promise<Post[] | string> {
    try {
      const allPosts = await this.postRepository.find();
      if (allPosts.length < 1) {
        return 'No se encontraron posts';
      }
      return allPosts;
    } catch (error) {
      console.error('Error al obtener los posts', error.message);
      throw new error('Error al obtener los posts');
    }
  }

  async getPostById(id: number): Promise<Post | string> {
    try {
      const findedPost = await this.postRepository.findOneBy({ id });
      if (!findedPost) {
        return 'El post no existe';
      }
      return findedPost;
    } catch (error) {
      console.error('Error al obtener el post', error.message);
      throw new error('Error al obtener el post');
    }
  }

  async createPost(post: Post): Promise<Post | string> {
    try {
      const date: Date = new Date();
      post.creationDate = date;
      const newPost = this.postRepository.create(post);
      await this.postRepository.save(newPost);
      return newPost;
    } catch (error) {
      console.error('Error al crear el post', error.message);
      throw new error('Error al crear el post');
    }
  }
}

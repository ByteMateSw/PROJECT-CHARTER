import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './post.entity';
import { ImagePost } from '../image/imagePost.entity';
import { CreatePostDto } from './dto/createPost.dto';
import { UserService } from '../user/user.service';
import { UptadePostDto } from './dto/uptadePost.dto';
import { title } from 'process';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post) private postRepository: Repository<Post>,
    @InjectRepository(ImagePost)
    private imagePostRepository: Repository<ImagePost>,
    private userService: UserService,
  ) {}

  async getAllPosts(): Promise<Post[]> {
    const allPosts = await this.postRepository.find();
    return allPosts;
  }

  async getPostById(id: number): Promise<Post> {
    const findedPost = await this.postRepository.findOneByOrFail({ id });
    return findedPost;
  }

  async createPost(
    userId: number,
    postDto: CreatePostDto,
    imageDataArray: Buffer[],
  ): Promise<Post> {
    const user = await this.userService.getUser({ id: userId });
    const date: Date = new Date();
    if (
      postDto.price !== undefined &&
      (postDto.price < 1 || postDto.price > 1000000)
    ) {
      throw new Error(`El precio debe estar entre ${1} y ${1000000}.`);
    }
    const newPost = this.postRepository.create(postDto);
    newPost.creationDate = date;
    newPost.user = user;
    await this.postRepository.save(newPost);
    const imagePosts = imageDataArray.map((imageData) =>
      this.imagePostRepository.create({ imageData, post: newPost }),
    );
    await this.imagePostRepository.save(imagePosts);
    return newPost;
  }

  async addImagesToPost(
    postId: number,
    imageDataArray: Buffer[],
  ): Promise<Post> {
    const post = await this.getPostById(postId);
    const imagePosts = imageDataArray.map((imageData) =>
      this.imagePostRepository.create({ imageData, post }),
    );
    await this.imagePostRepository.save(imagePosts);
    post.images = [...post.images, ...imagePosts];
    return await this.postRepository.save(post);
  }

  async removeImageFromPost(
    postId: number,
    imagePostId: number,
  ): Promise<Post> {
    const post = await this.getPostById(postId);
    const imagePost = await this.imagePostRepository.findOneOrFail({
      where: { id: imagePostId },
    });
    post.images = post.images.filter((image) => image.id !== imagePost.id);
    await this.imagePostRepository.remove(imagePost);
    return await this.postRepository.save(post);
  }

  async uptadePost(
    postId: number,
    uptadePostData: UptadePostDto,
  ): Promise<Post> {
    const postFound = await this.postRepository.findOneBy({ id: postId });
    if (!postFound) throw new Error('La publicación no existe');

    const uptadePost = { ...postFound, ...this.uptadePost };
    const savePost = await this.postRepository.save(uptadePost);
    return savePost;
  }

  async deletePost(postId: number): Promise<undefined> {
    const postDelFound = await this.postRepository.findOneBy({ id: postId });
    if (!postDelFound) throw new Error('La publicacion no existe');

    await this.postRepository.delete(postId);
    return undefined;
  }

  async getPostByName(title: string): Promise<Post> {
    const PostName = await this.postRepository.findOneBy({ title });
    return PostName;
  }
}

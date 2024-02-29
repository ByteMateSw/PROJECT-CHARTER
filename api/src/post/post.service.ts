import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './post.entity';
import { ImagePost } from '../image/imagePost.entity';
import { CreatePostDto } from './dto/createPost.dto';
import { UserService } from '../user/user.service';
import { UpdatePostDto } from './dto/updatePost.dto';
import { File, TitleAndOrId } from '../utils/types/functions.type';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post) private postRepository: Repository<Post>,
    @InjectRepository(ImagePost)
    private imagePostRepository: Repository<ImagePost>,
    private userService: UserService,
  ) {}
  ) {}

  async getAllPosts(): Promise<Post[]> {
    const allPosts = await this.postRepository.find({
      where: { user: { isDeleted: false } },
    });
    if (!allPosts) throw new NotFoundException('No se ha podido traer todos los post');
    return allPosts;
  }

  async getPostBy({ id, title }: TitleAndOrId): Promise<Post> {
    const findedPost = await this.postRepository.findOne({
      where: { id, title, user: { isDeleted: false } },
      relations: { images: true },
    });
    if (!findedPost) throw new NotFoundException('No se ha podido traer todos los post');
    return findedPost;
  }

  async createPost(userId: number, postDto: CreatePostDto): Promise<Post> {
    const user = await this.userService.getUser({ id: userId });
    if (!user) throw new NotFoundException('No se ha encontrado el usuario');
    const newPost = this.postRepository.create(postDto);
    newPost.user = user;
    return await this.postRepository.save(newPost);
  }

  async addImagesToPost(postId: number, images: File[]): Promise<ImagePost[]> {
    const post = await this.getPostBy({ id: postId });
    if (!post) if (!post) throw new NotFoundException('No se ha encontrado el post');
    return Promise.all(
      images.map(async image => {
        const newImage = this.imagePostRepository.create({
          imageData: image.buffer,
          contentType: image.mimetype,
          post,
        });
        await this.imagePostRepository.save(newImage);
        return newImage;
      }),
    );
  }

  async removeImageFromPost(imagePostId: number): Promise<ImagePost> {
    const imagePost = await this.imagePostRepository.findOne({
      where: { id: imagePostId },
    });
    if (!imagePost) throw new NotFoundException('Imágen no encontrada');
    return await this.imagePostRepository.remove(imagePost);
  }

  async updatePost(
    postId: number,
    updatePostData: UpdatePostDto,
  ): Promise<Post> {
    const postFound = await this.postRepository.findOneBy({ id: postId });
    if (!postFound) throw new NotFoundException('La publicación no existe');
    const uptadePost = { ...postFound, ...updatePostData };
    return await this.postRepository.save(uptadePost);
  }

  async deletePost(postId: number) {
    const postDelFound = await this.postRepository.findOne({
      where: { id: postId },
      relations: { images: true },
    });
    if (!postDelFound)
      throw new NotFoundException('La publicacion no existe');
    if (postDelFound.images.length > 0)
      Promise.all(
        postDelFound.images.map(async image => {
          await this.imagePostRepository.remove(image);
        }),
      );
    await this.postRepository.remove(postDelFound);
  }

  async existsPost(id: number): Promise<boolean> {
    return await this.postRepository.existsBy({ id });
  }

  async searchPost(
    query: string,
    page: number,
    limit: number,
  ): Promise<Post[]> {
    return this.postRepository
      .createQueryBuilder('post')
      .innerJoin('post.user', 'user')
      .where('"searchVector" @@ websearch_to_tsquery(:query)', {
        query,
      })
      .andWhere('user.isDeleted = :isDeleted', { isDeleted: false })
      .orderBy('ts_rank("searchVector", websearch_to_tsquery(:query))', 'DESC')
      .offset(page)
      .limit(limit)
      .getMany();
  }
}

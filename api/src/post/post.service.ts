import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './post.entity';
import { ImagePost } from '../image/imagePost.entity';
import { CreatePostDto } from './dto/createPost.dto';
import { UserService } from '../user/user.service';
import { UpdatePostDto } from './dto/updatePost.dto';
import { title } from 'process';
import { error } from 'console';

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
    if (!allPosts) throw new NotFoundException('No se ha podido traer todos los post');
    return allPosts;
  }

  async getPostById(id: number): Promise<Post> {
    const findedPost = await this.postRepository.findOneByOrFail({ id });
    if (!findedPost) throw new NotFoundException('No se ha podido traer todos los post');
    return findedPost;
  }

  async createPost(
    userId: number,
    postDto: CreatePostDto,
    imageDataArray: Buffer[],
  ): Promise<Post> {
    const user = await this.userService.getUser({ id: userId });
    if (!user) throw new NotFoundException('No se ha encontrado el usuario');
    const date: Date = new Date();
    if (!date) throw new BadRequestException('No se ha podido crear la fecha');
    if (
      postDto.price !== undefined &&
      (postDto.price < 1 || postDto.price > 1000000)
    ) {
      throw new BadRequestException(`El precio debe estar entre ${1} y ${1000000}.`);
    }
    const newPost = this.postRepository.create(postDto);
    newPost.creationDate = date;
    newPost.user = user;
    if (!newPost) throw new BadRequestException('No se ha podido crear el post');
    const savePost = await this.postRepository.save(newPost);
    if (!savePost) throw new BadRequestException('No se ha podido guardar el post creado');
    const imagePosts = imageDataArray.map((imageData) =>
      this.imagePostRepository.create({ imageData, post: newPost }),
    );
    if (!imagePosts) throw new BadRequestException('No se ha podido crear la imagen');
    const saveImgPost = await this.imagePostRepository.save(imagePosts);
    if (!saveImgPost)
      throw new BadRequestException('No se ha podido guardar la imagen creada');
    return newPost;
  }

  async addImagesToPost(
    postId: number,
    imageDataArray: Buffer[],
  ): Promise<Post> {
    const post = await this.getPostById(postId);
    if (!post) throw new NotFoundException('No se ha encontrado el post');
    const imagePosts = imageDataArray.map((imageData) =>
      this.imagePostRepository.create({ imageData, post }),
    );
    if (!imagePosts) throw new BadRequestException('No se ha podido crear las imagenes');
    const saveImgPost = await this.imagePostRepository.save(imagePosts);
    if (!saveImgPost)
      throw new BadRequestException('No se ha podido guardar las imagenes creadas');
    post.images = [...post.images, ...imagePosts];
    const saveAddImgPost = await this.postRepository.save(post);
    if (!saveAddImgPost) throw new BadRequestException ('No se ha podido agregar imagenes al post')
    return saveAddImgPost
  }

  async removeImageFromPost(
    postId: number,
    imagePostId: number,
  ): Promise<Post> {
    const post = await this.getPostById(postId);
    if (!post) throw new NotFoundException('No se ha encontrado el post');
    const imagePost = await this.imagePostRepository.findOneOrFail({
      where: { id: imagePostId },
    });
    post.images = post.images.filter((image) => image.id !== imagePost.id);
    if (!imagePost) throw new BadRequestException('No se han podido borrar las imagenes');
    const ImgRemove = await this.imagePostRepository.remove(imagePost);
    if (!ImgRemove) throw new BadRequestException('No se ha podido borrar las imagenes del post');
    const ImgPostRemove = await this.postRepository.save(post);
    if (!ImgPostRemove) throw new BadRequestException('No se ha podido borrar las imagenes guardadas del post');
    return ImgPostRemove
  }

  async updatePost(
    postId: number,
    updatePostData: UpdatePostDto,
  ): Promise<Post> {
    const postFound = await this.postRepository.findOneBy({ id: postId });
    if (!postFound) throw new NotFoundException('La publicación no existe');
    const uptadePost = { ...postFound, ...this.updatePost };
    if(!uptadePost) throw new BadRequestException('No se ha podido actualizar la publicación')
    const savePost = await this.postRepository.save(uptadePost);
    if(!savePost) throw new BadRequestException('No se ha podido guardar la actualizacion de la publicación')
    return savePost;
  }

  async deletePost(postId: number): Promise<undefined> {
    const postDelFound = await this.postRepository.findOneBy({ id: postId });
    if (!postDelFound) throw new NotFoundException('La publicacion no existe');
    const delPost = await this.postRepository.delete(postId);
    if (!delPost) throw new NotFoundException('No se ha podido borrar la publicación');
    return undefined;
  }

  async getPostByName(title: string): Promise<Post> {
    const PostName = await this.postRepository.findOneBy({ title });
    if (!PostName) throw new NotFoundException('No se ha podido encontrar la publicación')
    return PostName;
  }
}

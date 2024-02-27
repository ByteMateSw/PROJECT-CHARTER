import { Test, TestingModule } from '@nestjs/testing';
import { PostService } from './post.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import {  Repository } from 'typeorm';
import { Post } from './post.entity';
import { ImagePost } from '../image/imagePost.entity';
import { CreatePostDto } from './dto/createPost.dto';
import { UpdatePostDto } from './dto/updatePost.dto';
import { UserService } from '../user/user.service';
import { identity } from 'rxjs';
import { User } from '../user/user.entity';

describe('PostService', () => {
  let service: PostService;
  let postRepository: Repository<Post>;
  let imagePostRepository: Repository<ImagePost>;
  let userService: UserService;

  const mockPost: Post ={
    id: 1,
    title: 'Mock Post',
    description: 'Mock Description',
    creationDate: new Date(),
    itClosed: false,
    images: [],
    user: null,
    suscribers: [],
  }

  
  const mockPostRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
    findOneBy: jest.fn(),
    findOneByOrFail: jest.fn(),
    findOneOrFail: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    delete: jest.fn(),
  };

  const mockUserService = {
    getUserById: jest.fn(),
    finOne: jest.fn(),
  };
  
  
  const mockImagePostRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
    findOneOrFail: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
     
      providers: [
        PostService, 
        {
          provide: getRepositoryToken(Post),
          useValue: mockPostRepository,
        },
        {
          provide: getRepositoryToken(ImagePost),
          useValue: mockImagePostRepository,
        },
        {
        provide: UserService,
        useValue: mockUserService,
        },
       
      ],
      
    }).compile();
    service = module.get<PostService>(PostService);
    postRepository = module.get<Repository<Post>>(getRepositoryToken(Post));
    imagePostRepository = module.get<Repository<ImagePost>>(getRepositoryToken(ImagePost));
    userService = module.get<UserService>(UserService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAllPosts', () => {
    it('should return all post records', async () => {
      
      jest.spyOn(mockPostRepository, 'find').mockResolvedValue(mockPost);
      expect(await service.getAllPosts()).toEqual(mockPost);
      expect(postRepository.find).toHaveBeenCalled();
    });
  });


  describe('getPostById', () => {
    it('should return a post record by ID', async () => {
      
      mockPostRepository.findOneByOrFail.mockResolvedValue(mockPost);

      const result = await service.getPostById(1);

      expect(result).toEqual(mockPost);
      expect(mockPostRepository.findOneByOrFail).toHaveBeenCalledWith({id:1});
    });
    it('should throw an error if post with given ID is not found', async () => {
      mockPostRepository.findOneByOrFail.mockRejectedValue(new Error('Error al obtener el post solicitado'));
      await expect(service.getPostById(1)).rejects.toThrowError('Error al obtener el post solicitado');
    });
  });

  describe('createPost', () => {
    it('should create a new post', async () => {
      const userId = 1;
      const postDto: CreatePostDto = { title: 'Test Post', description: 'This is a test post.'};
      const imageDataArray: Buffer[] = [Buffer.from('image1')];

      mockUserService.getUserById.mockResolvedValue(1);
  
      const mockNewPost: Post = {
        id: 1,
        title: postDto.title,
        description: postDto.description,
        creationDate: new Date(),
        user:null,
        images: [],
        itClosed: false,
        suscribers: [],
      };
      mockPostRepository.create.mockReturnValue(mockNewPost);
  
      const mockImagePosts: ImagePost[] = imageDataArray.map((imageData) => ({
        id: Math.floor(Math.random() * 100) + 1,
        imageData: Buffer.from(imageData),
        post: mockNewPost,
      }));

      mockImagePostRepository.create.mockReturnValue(mockImagePosts);

      const result = await service.createPost(userId, postDto, imageDataArray);
      expect(result.title).toEqual(mockNewPost.title);
      expect(result.description).toEqual(mockNewPost.description);
        
      expect(mockPostRepository.create).toHaveBeenCalledWith(postDto);
      expect(mockPostRepository.save).toHaveBeenCalledWith(mockNewPost);
      expect(mockImagePostRepository.create).toHaveBeenCalledTimes(imageDataArray.length);
    });
  });


  describe('addImagesToPost', () => {
    it('should add images to a post', async () => {
    const postId= 1;
    const imageDataArray: Buffer[] = [Buffer.from('image1')];
     
      expect(await service.addImagesToPost(postId,imageDataArray)).toEqual(Post)
      expect(mockImagePostRepository.create).toHaveBeenCalledWith({ id: 1, imageData: Buffer.from('image1'), Post });
      expect(mockImagePostRepository.save).toHaveBeenCalledWith([{ id: 1, imageData: Buffer.from('image1'), Post }]);

      await service.addImagesToPost(postId, imageDataArray);

     
    });

    it('should throw an error if the post does not exist', async () => {
      const postId = 1;
      const imageDataArray: Buffer[] = [Buffer.from('image1')];
      mockPostRepository.findOneOrFail.mockRejectedValue(new Error('Post not found'));

      await expect(service.addImagesToPost(postId, imageDataArray)).rejects.toThrowError('Error al añadir imágenes');
      expect(mockPostRepository.findOneOrFail).toHaveBeenCalledWith(postId);
      expect(mockImagePostRepository.create).not.toHaveBeenCalled();
      expect(mockImagePostRepository.save).not.toHaveBeenCalled();
    });
  });

  describe('removeImageFromPost', () => {
    it('should remove an image from a post', async () => {
      const postId = 1;
      const imagePostId = 1;
      const mockPosts: Post[] = [];
      const imagePost: ImagePost = {
        id: imagePostId, 
        imageData: Buffer.from('image1'),
        post: new Post
      };
      expect(await service.removeImageFromPost).toHaveBeenCalledWith(postId, imagePostId);

      expect(mockPostRepository.findOneByOrFail).toHaveBeenCalledWith({ id: postId });
      expect(mockImagePostRepository.findOneOrFail).toHaveBeenCalledWith(imagePost);
      expect(mockImagePostRepository.remove).toHaveBeenCalledWith(imagePost);
      expect(mockPostRepository.save).toHaveBeenCalledWith(mockPosts);

    });

    it('should throw an error if the post does not exist', async () => {
      const postId = 1;
      const imagePostId = 1;

      expect(mockPostRepository.findOneByOrFail).toHaveBeenCalledWith(new Error('Post not found'));

      expect(await service.removeImageFromPost(postId, imagePostId)).toHaveBeenCalledWith(new Error('Error al remover una imágen'));
      expect(mockPostRepository.findOneByOrFail).toHaveBeenCalledWith(postId);
      expect(mockImagePostRepository.findOneOrFail).not.toHaveBeenCalled();
      expect(mockImagePostRepository.remove).not.toHaveBeenCalled();
      expect(mockPostRepository.save).not.toHaveBeenCalled();
    });

    it('should throw an error if the image post does not exist', async () => {
      const postId = 1;
      const imagePostId = 1;
      const mockPosts: Post[] = [];
      expect(mockPostRepository.findOneByOrFail).toHaveBeenCalledWith(mockPosts);
      expect(mockImagePostRepository.findOneOrFail).toHaveBeenCalledWith(new Error('Image post not found'));

      expect(await service.removeImageFromPost(postId, imagePostId)).rejects.toThrowError('Error al remover una imágen');
      expect(mockPostRepository.findOneByOrFail).toHaveBeenCalledWith(postId);
      expect(mockImagePostRepository.findOneOrFail).toHaveBeenCalledWith({ id: imagePostId });
      expect(mockImagePostRepository.remove).not.toHaveBeenCalled();
      expect(mockPostRepository.save).not.toHaveBeenCalled();
    });
  });

  describe('updatePost', () => {
    it('should update a post', async () => {
      const postId = 1;
      const updatePostData: UpdatePostDto = { title: 'Updated Title', description: 'Updated Description' };
       const mockPosts: Post[] = [];
     
      expect(mockPostRepository.findOneByOrFail).toHaveBeenCalledWith(mockPosts);
      expect(mockPostRepository.save).toHaveBeenCalledWith({ ...Post, ...updatePostData });

expect(await service.updatePost(postId, updatePostData)).toEqual({ ...mockPosts, ...updatePostData });

      expect(mockPostRepository.findOneByOrFail).toHaveBeenCalledWith({ id: postId });
      expect(mockPostRepository.save).toHaveBeenCalledWith({ ...mockPosts, ...updatePostData });
      expect(await service.updatePost(postId, updatePostData)).toEqual({ ...mockPosts, ...updatePostData });

    });

    it('should throw an error if the post does not exist', async () => {
      const postId = 1;
      const updatePostData: UpdatePostDto = { title: 'Updated Title', description: 'Updated Description' };
      expect(mockPostRepository.findOneByOrFail).toHaveBeenCalledWith(new Error('Post not found'));

      expect(await service.updatePost(postId, updatePostData)).rejects.toThrowError('La publicación no se ha podido borrar');
      expect(mockPostRepository.findOneByOrFail).toHaveBeenCalledWith({ id: postId });
      expect(mockPostRepository.save).not.toHaveBeenCalled();
    });
  });

  describe('deletePost', () => {
    it('should delete a post', async () => {
      const postId = 1;
      const mockPosts: Post[] = [];
      expect(mockPostRepository.findOneByOrFail).toHaveBeenCalledWith(mockPosts);

      const result = await service.deletePost(postId);

      expect(mockPostRepository.findOneByOrFail).toHaveBeenCalledWith({ id: postId });
      expect(mockPostRepository.delete).toHaveBeenCalledWith(postId);
      expect(result).toBeUndefined();
    });

    it('should throw an error if the post does not exist', async () => {
      const postId = 1;
      expect(mockPostRepository.findOneByOrFail).toHaveBeenCalledWith(new Error('Post not found'));

      await expect(service.deletePost(postId)).rejects.toThrowError('La publicación no se ha podido borrar');
      expect(mockPostRepository.findOneByOrFail).toHaveBeenCalledWith({ id: postId });
      expect(mockPostRepository.delete).not.toHaveBeenCalled();
    });
  });

  describe('getPostByName', () => {
    it('should get a post by name', async () => {
      const postName = 'Test Post';
      const mockPosts: Post[] = [];
      expect(mockPostRepository.findOneBy).toHaveBeenCalledWith({ title: postName });

      const result = await service.getPostByName(postName);

      expect(mockPostRepository.findOneBy).toHaveBeenCalledWith({ title: postName });
      expect(result).toEqual(mockPosts);
    });

    it('should throw an error if the post with the given name does not exist', async () => {
      const postName = 'Nonexistent Post';
      mockPostRepository.findOneBy.mockResolvedValue(null);

      expect(await service.getPostByName(postName)).rejects.toThrowError('La publicación no se ha podido encontrar');
      expect(mockPostRepository.findOneBy).toHaveBeenCalledWith({ title: postName });
    });
  });

});


  

import { Test, TestingModule } from '@nestjs/testing';
import { PostService } from './post.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './post.entity';
import { ImagePost } from '../image/imagePost.entity';
import { UserService } from '../user/user.service';
import { Readable } from 'stream';
import { NotFoundException } from '@nestjs/common';

describe('PostService', () => {
  let service: PostService;

  const mockUser = {
    id: 1,
  };

  const mockPost: Post = {
    id: 1,
    title: 'Mock Post',
    description: 'Mock Description',
    creationDate: new Date(),
    itClosed: false,
    images: [],
    user: null,
    suscribers: [],
    searchVector: '',
  };

  const mockImage: Express.Multer.File = {
    filename: 'test.png',
    fieldname: 'file',
    originalname: 'test.png',
    encoding: '7bit',
    mimetype: 'image/png',
    size: 10,
    destination: '/tmp',
    path: '/tmp/test.png',
    buffer: Buffer.from('image1'),
    stream: new Readable(),
  };

  const mockImagePost = {
    id: 1,
    imageData: mockImage.buffer,
    contentType: mockImage.mimetype,
  };

  const mockPostDto = {
    title: 'Test Post',
    description: 'This is a test post.',
  };

  const mockPostRepository = {
    find: jest.fn().mockResolvedValue([mockPost]),
    findOne: jest.fn().mockResolvedValue(mockPost),
    findOneBy: jest.fn().mockResolvedValue(mockPost),
    create: jest.fn().mockReturnValue(mockPost),
    save: jest.fn().mockResolvedValue(mockPost),
    remove: jest.fn(),
    existsBy: jest.fn().mockResolvedValue(true),
  };

  const mockUserService = {
    getUser: jest.fn().mockResolvedValue(mockUser),
    finOne: jest.fn().mockResolvedValue(mockUser),
  };

  const mockImagePostRepository = {
    find: jest.fn().mockResolvedValue([mockImagePost]),
    findOne: jest.fn().mockResolvedValue(mockImagePost),
    create: jest.fn().mockReturnValue(mockImagePost),
    save: jest.fn().mockResolvedValue(mockImagePost),
    remove: jest.fn().mockResolvedValue(mockImagePost),
  };

  beforeAll(async () => {
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
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAllPosts', () => {
    it('should return all post', async () => {
      expect(await service.getAllPosts()).toEqual([mockPost]);
      expect(mockPostRepository.find).toHaveBeenCalledWith({
        where: { user: { isDeleted: false } },
      });
    });

    it('should throw an exception for not obtaining any post', async () => {
      mockPostRepository.find.mockResolvedValueOnce(null);
      expect(async () => await service.getAllPosts()).rejects.toThrow(
        new NotFoundException('No se ha podido traer todos los post'),
      );
    });
  });

  describe('getPostBy', () => {
    it('should return a post by its ID', async () => {
      const postId = mockPost.id;
      expect(await service.getPostBy({ id: postId })).toEqual(mockPost);
      expect(mockPostRepository.findOne).toHaveBeenCalledWith({
        where: { id: postId, user: { isDeleted: false } },
        relations: { images: true },
      });
    });

    it('should return a post by its title', async () => {
      const title = mockPost.title;
      expect(await service.getPostBy({ title })).toEqual(mockPost);
      expect(mockPostRepository.findOne).toHaveBeenCalledWith({
        where: { title, user: { isDeleted: false } },
        relations: { images: true },
      });
    });

    it('should throw an error if post with given ID is not found', async () => {
      mockPostRepository.findOne.mockResolvedValueOnce(null);
      expect(
        async () => await service.getPostBy({ id: mockPost.id }),
      ).rejects.toThrow(
        new NotFoundException('No se ha podido traer todos los post'),
      );
    });
  });

  describe('createPost', () => {
    it('should create a new post', async () => {
      const id = mockUser.id;
      expect(await service.createPost(id, mockPostDto)).toEqual(mockPost);
      expect(mockUserService.getUser).toHaveBeenCalledWith({ id });
      expect(mockPostRepository.create).toHaveBeenCalledWith(mockPostDto);
      expect(mockPostRepository.save).toHaveBeenCalledWith({
        ...mockPost,
        user: mockUser,
      });
    });

    it('should throw an error if user with given ID is not found', async () => {
      mockUserService.getUser.mockResolvedValueOnce(null);
      expect(
        async () => await service.createPost(mockUser.id, mockPostDto),
      ).rejects.toThrow(
        new NotFoundException('No se ha encontrado el usuario'),
      );
    });
  });

  describe('addImagesToPost', () => {
    it('should add images to a post', async () => {
      const postId = mockPost.id;
      jest.spyOn(service, 'getPostBy').mockResolvedValueOnce(mockPost);
      expect(await service.addImagesToPost(postId, [mockImage])).toEqual([
        mockImagePost,
      ]);
      expect(service.getPostBy).toHaveBeenCalledWith({ id: postId });
      expect(mockImagePostRepository.create).toHaveBeenCalledWith({
        imageData: mockImage.buffer,
        contentType: mockImage.mimetype,
        post: mockPost,
      });
      expect(mockImagePostRepository.save).toHaveBeenCalledWith(mockImagePost);
    });

    it('should throw an error if the post does not exist', async () => {
      const postId = mockPost.id;
      jest.spyOn(service, 'getPostBy').mockResolvedValueOnce(null);

      expect(
        async () => await service.addImagesToPost(postId, [mockImage]),
      ).rejects.toThrow(new NotFoundException('No se ha encontrado el post'));
      expect(service.getPostBy).toHaveBeenCalledWith({ id: postId });
    });
  });

  describe('removeImageFromPost', () => {
    it('should remove an image from a post', async () => {
      const imageId = mockImagePost.id;

      expect(await service.removeImageFromPost(imageId)).toEqual(mockImagePost);
      expect(mockImagePostRepository.findOne).toHaveBeenCalledWith({
        where: { id: imageId },
      });
      expect(mockImagePostRepository.remove).toHaveBeenCalledWith(
        mockImagePost,
      );
    });

    it('should throw an error if the image post does not exist', async () => {
      const imagePostId = mockImagePost.id;
      mockImagePostRepository.findOne.mockResolvedValueOnce(null);

      expect(
        async () => await service.removeImageFromPost(mockImagePost.id),
      ).rejects.toThrow(new NotFoundException('Imágen no encontrada'));
      expect(mockImagePostRepository.findOne).toHaveBeenCalledWith({
        where: { id: imagePostId },
      });
    });
  });

  describe('updatePost', () => {
    it('should update a post', async () => {
      const postId = mockPost.id;

      expect(await service.updatePost(postId, mockPostDto)).toEqual(mockPost);
      expect(mockPostRepository.findOneBy).toHaveBeenCalledWith({ id: postId });
      expect(mockPostRepository.save).toHaveBeenCalledWith({
        ...mockPost,
        ...mockPostDto,
      });
    });

    it('should throw an error if the post does not exist', async () => {
      const postId = mockPost.id;
      mockPostRepository.findOneBy.mockResolvedValueOnce(null);
      expect(
        async () => await service.updatePost(postId, mockPostDto),
      ).rejects.toThrow(new NotFoundException('La publicación no existe'));
      expect(mockPostRepository.findOneBy).toHaveBeenCalledWith({ id: postId });
    });
  });

  describe('deletePost', () => {
    it('should delete a post', async () => {
      const postId = mockPost.id;

      await service.deletePost(postId);

      expect(mockPostRepository.findOne).toHaveBeenCalledWith({
        where: { id: postId },
        relations: { images: true },
      });
      expect(mockImagePostRepository.remove).toHaveBeenCalledWith(
        mockImagePost,
      );
      expect(mockPostRepository.remove).toHaveBeenCalledWith(mockPost);
    });

    it('should throw an error if the post does not exist', async () => {
      const postId = mockPost.id;
      mockPostRepository.findOne.mockResolvedValueOnce(null);

      expect(async () => await service.deletePost(postId)).rejects.toThrow(
        new NotFoundException('La publicacion no existe'),
      );
      expect(mockPostRepository.findOne).toHaveBeenCalledWith({
        where: { id: postId },
        relations: { images: true },
      });
    });
  });

  describe('existsPost', () => {
    it('should return if exist an post by its id', async () => {
      const postId = mockPost.id;

      expect(await service.existsPost(postId)).toEqual(true);

      expect(mockPostRepository.existsBy).toHaveBeenCalledWith({ id: postId });
    });
  });
});

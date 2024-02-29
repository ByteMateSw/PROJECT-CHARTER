import { CreatePostDto } from './dto/createPost.dto';
import { PostController } from './post.controller';
import { Test, TestingModule } from '@nestjs/testing';
import { PostService } from './post.service';
import { HttpException } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common';

describe('PostController', () => {
  let controller: PostController;

  const mockPost = {
    id: 1,
    title: 'Post 1',
    description: 'Descripcion 1',
    creationDate: 'Date 1',
    itClosed: true,
  };

  const mockCreatePostDto: CreatePostDto = {
    title: 'New Post',
    description: 'New Description',
  };

  const mockError = new Error('Error al buscar el post por ID');

  const mockCreateMessage = 'El Post ha sido creado correctamente';

  const mockDeleteMessage = 'El Post ha sido borrado correctamente';

  const mockUpdateMessage = 'El Post se ha actualizado correctamente';

  const mockPostService = {
    getAllPost: jest.fn().mockResolvedValue([mockPost]),
    getPostBy: jest.fn().mockResolvedValue(mockPost),
    createPost: jest.fn().mockResolvedValue(mockCreateMessage),
    deletePost: jest.fn().mockResolvedValue(mockDeleteMessage),
    updatePost: jest.fn().mockResolvedValue(mockUpdateMessage),
    addImagesToPost: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostController],
      providers: [PostService],
    })

      .overrideProvider(PostService)
      .useValue(mockPostService)
      .compile();

    controller = module.get<PostController>(PostController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createPost', () => {
    it('should create a new post', async () => {
      const userId = 1;
      const imageDataArray = [];
      const newPostData = { title: 'New Post', description: 'New Description' };
      const newPostDto = new CreatePostDto();
      Object.assign(newPostDto, newPostData);
      const result = await controller.createPost(
        newPostDto,
        userId,
        imageDataArray,
      );
      expect(result).toEqual(mockCreateMessage);
    });

    it('should throw an HttpException with HttpStatus.BAD_REQUEST when postService throws an error', async () => {
      mockPostService.createPost.mockRejectedValueOnce(mockError);
      await expect(async () => {
        const userId = 1;
        const imageDataArray = [];
        const newPostData = {
          title: 'New Post',
          description: 'New Description',
        };
        const newPostDto = new CreatePostDto();
        Object.assign(newPostDto, newPostData);
        await controller.createPost(newPostDto, userId, imageDataArray);
      }).rejects.toThrow(
        new HttpException(mockError.message, HttpStatus.BAD_REQUEST),
      );
    });
  });

  describe('findOne', () => {
    it('should return the post with the specified ID', async () => {
      const mockPost = {
        id: 1,
        title: 'Post 1',
        description: 'Descripcion 1',
        creationDate: 'Date 1',
        itClosed: true,
      };
      const result = await controller.getPostById(1);
      expect(result).toEqual(mockPost);
    });

    it('should throw an HttpException with HttpStatus.INTERNAL_SERVER_ERROR when postService throws an error', async () => {
      mockPostService.getPostBy.mockRejectedValueOnce(mockError);
      await expect(async () => await controller.getPostById(1)).rejects.toThrow(
        new HttpException(
          'Error al buscar el post por ID',
          HttpStatus.INTERNAL_SERVER_ERROR,
        ),
      );
    });
  });

  describe('deletePost', () => {
    it('should delete the post with the specified ID', async () => {
      const id = 1;
      const result = await controller.deletePost(id);
      expect(result).toEqual({
        message: 'La publicación se ha borrado correctamente',
      });
    });

    it('should throw an HttpException with HttpStatus.FORBIDDEN when postService throws an error', async () => {
      mockPostService.deletePost.mockRejectedValueOnce(mockError);
      const id = 1;
      await expect(async () => await controller.deletePost(id)).rejects.toThrow(
        new HttpException(mockError.message, HttpStatus.FORBIDDEN),
      );
    });
  });

  describe('updatePost', () => {
    it('should update the post with the specified ID', async () => {
      const id = 1;
      const result = await controller.updatePost(id, mockCreatePostDto);
      expect(result).toEqual({
        message: 'La publicación se actualizó correctamente',
      });
    });

    it('should throw an HttpException with HttpStatus.FORBIDDEN when officeService throws an error', async () => {
      mockPostService.updatePost.mockRejectedValueOnce(mockError);
      const id = 1;
      await expect(
        async () => await controller.updatePost(id, mockCreatePostDto),
      ).rejects.toThrow(
        new HttpException(mockError.message, HttpStatus.FORBIDDEN),
      );
    });
  });
});

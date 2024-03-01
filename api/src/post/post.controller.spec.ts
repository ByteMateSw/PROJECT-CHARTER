import { CreatePostDto } from './dto/createPost.dto';
import { PostController } from './post.controller';
import { Test, TestingModule } from '@nestjs/testing';
import { PostService } from './post.service';
import { Readable } from 'typeorm/platform/PlatformTools';

describe('PostController', () => {
  let controller: PostController;

  const mockPost = {
    id: 1,
    title: 'Post 1',
    description: 'Descripcion 1',
    creationDate: 'Date 1',
    itClosed: false,
  };

  const mockUserId = 1;

  let mockImage: Express.Multer.File = {
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

  const mockCreatePostDto: CreatePostDto = {
    title: 'New Post',
    description: 'New Description',
  };

  const mockUpdatePostDto: CreatePostDto = {
    title: 'New Post',
    description: 'New Description',
  };

  const mockRemoveImage = { message: 'La imagen se ha borrado correctamente' };

  const mockDeleteMessage = {
    message: 'La publicación se ha borrado correctamente',
  };

  const mockUpdateMessage = {
    message: 'La publicación se actualizó correctamente',
  };

  const mockPostService = {
    getAllPosts: jest.fn().mockResolvedValue([mockPost]),
    getPostBy: jest.fn().mockResolvedValue(mockPost),
    createPost: jest.fn().mockResolvedValue(mockPost),
    deletePost: jest.fn().mockResolvedValue(mockDeleteMessage),
    updatePost: jest.fn().mockResolvedValue(mockUpdateMessage),
    addImagesToPost: jest.fn().mockResolvedValue([mockImage]),
    removeImageFromPost: jest.fn().mockResolvedValue([mockImage]),
    searchPost: jest.fn().mockResolvedValue([mockPost]),
  };

  beforeAll(async () => {
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
      expect(
        await controller.createPost(mockCreatePostDto, mockUserId, [mockImage]),
      ).toEqual(mockPost);
      expect(mockPostService.createPost).toHaveBeenCalledWith(
        mockUserId,
        mockCreatePostDto,
      );
      expect(mockPostService.addImagesToPost).toHaveBeenCalledWith(
        mockPost.id,
        [mockImage],
      );
    });
  });

  describe('getPostById', () => {
    it('should return the post with the specified ID', async () => {
      expect(await controller.getPostById(1)).toEqual(mockPost);
      expect(mockPostService.getPostBy).toHaveBeenCalledWith({
        id: mockUserId,
      });
    });
  });

  describe('getAllPosts', () => {
    it('should return all the posts', async () => {
      expect(await controller.getAllPosts()).toEqual([mockPost]);
      expect(mockPostService.getAllPosts).toHaveBeenCalledTimes(1);
    });
  });

  describe('getPostByName', () => {
    it('should return all the posts', async () => {
      const mockSearch = 'test';
      const mockPage = 1;
      const mockLimit = 1;
      expect(
        await controller.getPostByName(mockSearch, mockPage, mockLimit),
      ).toEqual([mockPost]);
      expect(mockPostService.searchPost).toHaveBeenCalledTimes(1);
    });
  });

  describe('addImageToPost', () => {
    it('should add images to the post', async () => {
      const id = mockPost.id;
      expect(await controller.addImageToPost(id, [mockImage])).toEqual([
        mockImage,
      ]);
      expect(mockPostService.addImagesToPost).toHaveBeenCalledWith(id, [
        mockImage,
      ]);
    });
  });

  describe('removeImageFromPost', () => {
    it('should remove the images to the post', async () => {
      const id = 1;
      expect(await controller.removeImageFromPost(id)).toEqual(mockRemoveImage);
      expect(mockPostService.removeImageFromPost).toHaveBeenCalledWith(id);
    });
  });

  describe('deletePost', () => {
    it('should delete the post with the specified ID', async () => {
      const id = mockPost.id;
      expect(await controller.deletePost(id)).toEqual(mockDeleteMessage);
      expect(mockPostService.deletePost).toHaveBeenCalledWith(id);
    });
  });

  describe('updatePost', () => {
    it('should update the post with the specified ID', async () => {
      const id = mockPost.id;
      expect(await controller.updatePost(id, mockUpdatePostDto)).toEqual(
        mockUpdateMessage,
      );
      expect(mockPostService.updatePost).toHaveBeenCalledWith(
        id,
        mockUpdatePostDto,
      );
    });
  });
});

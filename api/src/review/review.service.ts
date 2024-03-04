import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Review } from './review.entity';
import { UserService } from '../user/user.service';
import { Repository } from 'typeorm';
import { CreateReviewDTO } from './dto/createReview.dto';
import { UptadeReviewDTO } from './dto/uptadeReview.dto';
import { Role } from '../utils/enums/role.enum';

/**
 * Service class for managing reviews.
 */
@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Review) private reviewRepository: Repository<Review>,
    private userService: UserService,
  ) {}

  /**
   * Creates a new review.
   * @param score - The score of the review.
   * @param description - The description of the review.
   * @returns The created review.
   */
  async createReview(
    createReviewDto: CreateReviewDTO,
    userId: number,
  ): Promise<Review> {
    const createReview = this.reviewRepository.create({
      ...createReviewDto,
      user: { id: userId },
    });
    return await this.reviewRepository.save(createReview);
  }

  /**
   * Retrieves all reviews.
   * @returns An array of reviews.
   */
  async getAllReviews(skip: number, take: number): Promise<Review[]> {
    return await this.reviewRepository.find({
      relations: { user: true },
      skip,
      take,
    });
  }

  /**
   * Retrieves a review by its ID.
   * @param id - The ID of the review.
   * @returns The review with the specified ID.
   */
  async getReviewById(id: number): Promise<Review> {
    return await this.reviewRepository.findOne({
      where: { id },
      relations: { user: true },
    });
  }

  /**
   * Updates a review.
   * @param id - The ID of the review to update.
   * @param UpdateReviewDTO - The updated review data.
   */
  async updateReview(
    id: number,
    updateReviewDTO: UptadeReviewDTO,
  ): Promise<void> {
    const reviewFound = await this.reviewRepository.findOneBy({ id });
    if (!reviewFound) throw new NotFoundException('La calificación no existe');
    await this.reviewRepository.save({ ...reviewFound, ...updateReviewDTO });
  }

  /**
   * Deletes a review. Only the admin and the user who created the review can delete it.
   * @param reviewId - The ID of the review to delete.
   * @throws NotFoundException if the review with the specified ID is not found.
   * @throws UnauthorizedException if the user does not have permission to delete the review.
   */
  async deleteReview(reviewId: number, userId: number): Promise<void> {
    const reviewFound = await this.reviewRepository.findOne({
      where: {
        id: reviewId,
      },
      relations: { user: true },
    });
    if (!reviewFound) throw new NotFoundException('La calificación no existe');

    const role = await this.userService.getRole(userId);
    if (role !== Role.Admin && reviewFound.user.id !== userId)
      throw new UnauthorizedException(
        'No tienes permisos para borrar la calificación',
      );

    await this.reviewRepository.delete(reviewId);
  }
}

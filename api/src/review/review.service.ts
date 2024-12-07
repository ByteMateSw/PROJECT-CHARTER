import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Review } from './review.entity';
import { UserService } from '../user/user.service';
import { Repository } from 'typeorm';
import { CreateReviewDTO } from './dto/create-review.dto';
import { UptadeReviewDTO } from './dto/uptade-review.dto';
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
    createReview: CreateReviewDTO,
    userId: number,
    contractorId: number,
  ): Promise<Review> {
    const newReview = this.reviewRepository.create({
      score: createReview.score,
      description: createReview.description,
      hiring: createReview.hiring,
      user: { id: userId },
      contractor: { id: contractorId },
    });
    return await this.reviewRepository.save(newReview);
  }

  /**
   * Creates a new review.
   * @param userId - id of user
   * @returns The review score.
   */
  async getScore(userId: number): Promise<number> {
    const review = await this.reviewRepository.findBy({
      user: { id: userId },
    });
    const rewiewLength = review.length;
    let totalScore: number = 0;
    review.map((rev) => (totalScore += rev.score / 1));

    return totalScore / rewiewLength;
  }

  /**
   * Retrieves all reviews.
   * @returns An array of reviews.
   */
  async getAllReviews(
    skip: number,
    take: number,
    userId: number,
  ): Promise<Review[]> {
    return await this.reviewRepository.find({
      relations: { user: true },
      where: { user: { id: userId } },
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
  async updateReview(id: number, updateReview: UptadeReviewDTO): Promise<void> {
    const review = await this.reviewRepository.findOneBy({ id });
    if (!review) throw new NotFoundException('La calificación no existe');
    await this.reviewRepository.save({ ...review, ...updateReview });
  }

  /**
   * Deletes a review. Only the admin and the user who created the review can delete it.
   * @param reviewId - The ID of the review to delete.
   * @throws NotFoundException if the review with the specified ID is not found.
   * @throws UnauthorizedException if the user does not have permission to delete the review.
   */
  async deleteReview(reviewId: number, userId: number): Promise<void> {
    const review = await this.reviewRepository.findOne({
      where: {
        id: reviewId,
      },
      relations: { user: true },
    });
    if (!review) throw new NotFoundException('La calificación no existe');

    const userRole = await this.userService.getRole(userId);
    if (userRole !== Role.Admin && review.user.id !== userId)
      throw new UnauthorizedException(
        'No tienes permisos para borrar la calificación',
      );

    await this.reviewRepository.remove(review);
  }
}

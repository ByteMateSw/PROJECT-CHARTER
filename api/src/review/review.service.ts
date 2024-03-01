import { BadRequestException, HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Review } from './review.entity';
import { UserService } from '../user/user.service';
import { Repository } from 'typeorm';
import { ResponseMessage } from '../utils/types/functions.type';

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
   * @throws BadRequestException if the score is outside the range of 0.5 to 5.
   * @throws BadRequestException if the review could not be created.
   * @throws BadRequestException if the review could not be saved.
   */
  async createReview(score: number, description: string): Promise<Review> {
    if (score < 0.5 || score > 5) throw new BadRequestException('La calificación está fuera de rango')
    const createReview = await this.reviewRepository.create({ score, description });
    if (!createReview) throw new BadRequestException ('No se ha podido crear la review')
    const saveReview = await this.reviewRepository.save(createReview);
    if (!saveReview) throw new BadRequestException ('No se ha podido guardar la review')
    return saveReview
  }

  /**
   * Retrieves all reviews.
   * @returns An array of reviews.
   * @throws NotFoundException if no reviews are found.
   */
  async getAllReviews(): Promise<Review[]> {
    const reviews = await this.reviewRepository.find()
    if (!reviews) throw new NotFoundException('No se encontraron las reviews');
    return reviews
  }

  /**
   * Retrieves a review by its ID.
   * @param id - The ID of the review.
   * @returns The review with the specified ID.
   * @throws NotFoundException if the review with the specified ID is not found.
   */
  async getReviewById(id: number): Promise<Review> {
    const review = await this.reviewRepository.findOneBy({ id });
    if (!review) throw new NotFoundException('No se encontró la calificación por ID');
    return review
  }

  /**
   * Updates a review.
   * @param id - The ID of the review to update.
   * @param UpdateReviewDTO - The updated review data.
   * @returns The updated review.
   * @throws NotFoundException if the review with the specified ID is not found.
   * @throws BadRequestException if the review could not be updated.
   * @throws BadRequestException if the updated review could not be saved.
   */
  async updateReview(id: number, UpdateReviewDTO): Promise<Review> {
    const reviewFound = await this.reviewRepository.findOneBy({ id });
    if (!reviewFound) throw new NotFoundException('La calificación no existe');
    const reviewUpdate = await this.reviewRepository.update(id, UpdateReviewDTO);
    if (reviewUpdate.affected === 0) throw new BadRequestException('No se pudo actualizar la calificación');
    const reviewSave = await this.reviewRepository.save({ id });
    if (!reviewSave) throw new BadRequestException('No se pudo guardar la actualizació la calificación');
    return reviewSave
  }

  /**
   * Deletes a review.
   * @param id - The ID of the review to delete.
   * @returns A response message indicating the success of the deletion.
   * @throws NotFoundException if the review with the specified ID is not found.
   * @throws BadRequestException if the review could not be deleted.
   */
  async deleteReview(id: number): Promise<ResponseMessage> {
    const reviewDelFound = await this.reviewRepository.findOneBy({ id });
    if (!reviewDelFound) throw new NotFoundException('La calificación no existe');
    const deleteReview = await this.reviewRepository.delete(id);
    if (deleteReview.affected === 0) throw new BadRequestException('No se pudo borrar la calificación');
    return { message: 'El contrato se ha borrado correctamente' };
  }
}

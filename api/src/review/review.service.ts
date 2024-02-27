import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Review } from './review.entity';
import { UserService } from '../user/user.service';
import { Repository } from 'typeorm';
import { ResponseMessage } from '../utils/types/functions.type';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Review) private reviewRepository: Repository<Review>,
    private userService: UserService,
  ) {}

  async createReview(score: number, description: string): Promise<Review> {
    if (score < 0.5 || score > 5) throw new Error('La calificación está fuera de rango')
    const createReview = await this.reviewRepository.create({ score, description });
    if (!createReview) throw new Error ('No se ha podido crear la review')
    const saveReview = await this.reviewRepository.save(createReview);
    if (!saveReview) throw new Error ('No se ha podido guardar la review')
    return saveReview
  }

  async getAllReviews(): Promise<Review[]> {
    const reviews = await this.reviewRepository.find()
    if (!reviews) throw new Error('No se encontraron las reviews');
    return reviews
  }

  async getUptadeById(id: number): Promise<Review> {
    const review = await this.reviewRepository.findOneBy({ id });
    if (!review) throw new Error('No se encontró la calificación por ID');
    return review
  }

  async uptadeReview(id: number, UptadeReviewDTO): Promise<Review> {
    const reviewFound = await this.reviewRepository.findOneBy({ id });
    if (!reviewFound) throw new Error('La calificación no existe');
    const updateReview = await this.reviewRepository.update(id, UptadeReviewDTO);
    if (updateReview.affected === 0) throw new Error('No se pudo actualizar la calificación');
    return await this.reviewRepository.save({ id });
  }

  async deleteReview(id: number): Promise<ResponseMessage> {
    const reviewDelFound = await this.reviewRepository.findOneBy({ id });
    if (!reviewDelFound) throw new Error('La calificación no existe');
    const deleteReview = await this.reviewRepository.delete(id);
    if (deleteReview.affected === 0) throw new Error('No se pudo borrar la calificación');
    return { message: 'El contrato se ha borrado correctamente' };
  }
}

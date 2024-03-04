import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDTO } from './dto/create-review.dto';
import { AccessTokenGuard } from '../auth/jwt/access.guard';
import { UserParamID } from '../utils/params/user.param';
import { Review } from './review.entity';
import { UptadeReviewDTO } from './dto/uptade-review.dto';
import { CustomParseIntPipe } from '../utils/pipes/parse-int.pipe';
import { QueryNumberPipe } from '../utils/pipes/query-number.pipe';
import { EmptyBodyPipe } from 'src/utils/pipes/empty-body.pipe';

/**
 * Controller for managing reviews.
 */
@Controller('reviews')
export class ReviewController {
  constructor(private reviewService: ReviewService) {}

  /**
   * Create a new review.
   * @param createReviewDto - The data for creating the review.
   * @param userId - The ID of the user creating the review, obtained from the access token.
   * @returns A promise that resolves to the created review.
   */
  @UseGuards(AccessTokenGuard)
  @Post()
  async createReview(
    @Body() createReviewDto: CreateReviewDTO,
    @UserParamID() userId: number,
  ): Promise<Review> {
    return await this.reviewService.createReview(createReviewDto, userId);
  }

  /**
   * Get all reviews.
   * @param page - The page number.
   * @param limit - The number of reviews to retrieve per page.
   * @returns A promise that resolves to an array of reviews.
   */
  @Get()
  async getAllReviews(
    @Query('page', QueryNumberPipe) page: number,
    @Query('limit', QueryNumberPipe) limit: number,
  ): Promise<Review[]> {
    return await this.reviewService.getAllReviews(page, limit);
  }

  /**
   * Get a review by its ID.
   * @param id - The ID of the review.
   * @returns A promise that resolves to the retrieved review.
   */
  @Get(':id')
  async getReviewById(
    @Param('id', CustomParseIntPipe) id: number,
  ): Promise<Review> {
    return await this.reviewService.getReviewById(id);
  }

  /**
   * Update a review.
   * @param id - The ID of the review to update.
   * @param UptadeReviewDTO - The updated review data.
   */
  @UseGuards(AccessTokenGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Patch(':id')
  async uptadeReview(
    @Param('id', CustomParseIntPipe) id: number,
    @Body(EmptyBodyPipe) uptadeReviewDTO: UptadeReviewDTO,
  ): Promise<void> {
    await this.reviewService.updateReview(id, uptadeReviewDTO);
  }

  /**
   * Delete a review.
   * @param id - The ID of the review to delete.
   * @param userId - The ID of the user deleting the review, obtained from the access token.
   */
  @UseGuards(AccessTokenGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async deleteReview(
    @Param('id', ParseIntPipe) reviewId: number,
    @UserParamID() userId: number,
  ): Promise<void> {
    await this.reviewService.deleteReview(reviewId, userId);
  }
}

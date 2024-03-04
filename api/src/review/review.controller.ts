import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, ParseIntPipe, Post, Put } from "@nestjs/common";

/**
 * Controller for managing reviews.
 */
@Controller('Review')
export class ReviewController {
    constructor(private reviewService) { }

    /**
     * Create a new review.
     * @param score - The score of the review.
     * @param description - The description of the review.
     * @returns A promise that resolves to a success message.
     * @throws HttpException if there is an error creating the review.
     */
    @Post('save')
    async createReview(@Body() score: number, description: string): Promise<string> {
        try {
            await this.reviewService.createReview(score, description)
            return 'La calificación se ha creado correctamente'
        } catch (error) {
            throw new HttpException(error.mesage, HttpStatus.BAD_REQUEST);
        }
    }

    /**
     * Get all reviews.
     * @returns A promise that resolves to a success message.
     * @throws HttpException if there is an error getting the reviews.
     */
    @Get('name')
    async getAllReviews(): Promise<string> {
        try {
            await this.reviewService.getAllReviews()
            return 'Se trajeron todas las calificaciones correctamente'
        } catch (error) {
            throw new HttpException(error.mesage, HttpStatus.NOT_FOUND);
        }
    }

    /**
     * Get a review by its ID.
     * @param id - The ID of the review.
     * @returns A promise that resolves to a success message.
     * @throws HttpException if there is an error getting the review.
     */
    @Get('GetById')
    async getReviewById(@Param('id', ParseIntPipe) id: number) {
        try {
            await this.reviewService.getReviewById(id)
            return 'Se ha encontrado por Id la calificación'
        } catch (error) {
            throw new HttpException(error.mesage, HttpStatus.NOT_FOUND);
        }
    }

    /**
     * Update a review.
     * @param id - The ID of the review to update.
     * @param UptadeReviewDTO - The updated review data.
     * @throws HttpException if there is an error updating the review.
     */
    @Put(':id')
    async uptadeReview(@Body() id: number, UptadeReviewDTO) {
        try {
            await this.reviewService.updateReview({ id, UptadeReviewDTO })
        } catch (error) {
            throw new HttpException(error.mesage, HttpStatus.BAD_REQUEST);
        }
    }

    /**
     * Delete a review.
     * @param id - The ID of the review to delete.
     * @throws HttpException if there is an error deleting the review.
     */
    @Delete(':id')
    async deleteReview(@Body() id: number) {
        try {
            await this.reviewService.deleteReview(id)
        } catch (error) {
            throw new HttpException(error.mesage, HttpStatus.BAD_REQUEST);
        }
    }
}

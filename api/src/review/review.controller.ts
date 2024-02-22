import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { Review } from "./review.entity";

@Controller('Review')
export class ReviewController {
    constructor(private reviewService) { }


    @Post('save')
    async createReview(@Body() score: number, description: string): Promise<string> {
        try {
            await this.reviewService.createReview(score, description)
            return 'La calificación se ha creado correctamente'
        } catch (error) {
            throw new HttpException(error.mesage, HttpStatus.BAD_REQUEST);
        }
    }

    @Get('name')
    async getAllReviews(): Promise<string> {
        try {
            await this.reviewService.getAllReviews()
            return 'Se trajeron todas las calificaciones correctamente'
        } catch (error) {
            throw new HttpException(error.mesage, HttpStatus.NOT_FOUND);
        }
    }

    @Get('GetById')
    async getReviewById(@Param('id', ParseIntPipe) id: number) {
        try {
            await this.reviewService.getReviewById(id)
            return 'Se ha encontrado por Id la calificación'
        } catch (error) {
            throw new HttpException(error.mesage, HttpStatus.NOT_FOUND);
        }
    }

    @Put(':id')
    async uptadeReview(@Body() id: number, UptadeReviewDTO) {
        try {
            await this.reviewService.updateReview({ id, UptadeReviewDTO })
        } catch (error) {
            throw new HttpException(error.mesage, HttpStatus.BAD_REQUEST);
        }
    }

    @Delete(':id')
    async deleteReview(@Body() id: number) {
        try {
            await this.reviewService.deleteReview(id)
        } catch (error) {
            throw new HttpException(error.mesage, HttpStatus.BAD_REQUEST);
        }
    }


}

import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Review } from "./review.entity";
import { UserService } from "../user/user.service";
import { Repository } from "typeorm";
import { ResponseMessage } from "../utils/types/functions.type";

@Injectable()
export class ReviewService {
    constructor(
        @InjectRepository(Review) private reviewRepository: Repository<Review>,
        private userService: UserService
    ) { }

    async createReview(score: number, description: string): Promise<Review> {
        try {
            if (score < 0.5 || score > 5) throw new Error ('La calificación está fuera de rango')
            const review = await this.reviewRepository.create({ score, description })
            return await this.reviewRepository.save(review)
        } catch (error) {
            console.error("No se ha podido crear la calificación")
            throw new Error("No se ha podido crear la calificación")
        }
    }

    async getAllReviews(): Promise<Review[]> {
        try {
            return await this.reviewRepository.find()
        } catch (error) {
            console.error("No se ha podido traer todas las calificaciones")
            throw new Error("No se ha podido traer todas las calificaciones")
        }
    }

    async getUptadeById(id: number): Promise<Review> {
        try {
            return await this.reviewRepository.findOneBy({ id })
        } catch (error) {
            console.error("La calificación no existe")
            throw new Error("La calificación no existe")
        }
    }

    async uptadeReview(id: number, UptadeReviewDTO):Promise<Review> {
        try {
            const reviewFound = await this.reviewRepository.findOneBy({ id })
            if (!reviewFound) throw new Error('La calificación no existe')
            return await this.reviewRepository.save({id})
        } catch (error) {
            console.error("No se ha podido actualizar la calificación")
            throw new Error("No se ha podido actualizar la calificación")
        }
    }

    async deleteReview(id:number): Promise<ResponseMessage>{
        try {
            const reviewDelFound = await this.reviewRepository.findOneBy({ id })
            if (!reviewDelFound) throw new Error ('La calificación no existe')
            await this.reviewRepository.delete(id)
            return { message: 'El contrato se ha borrado correctamente' };
        } catch (error) {
            console.error("No se ha podido eliminar la calificación")
            throw new Error("No se ha podido eliminar la calificación")
        }
    }
}
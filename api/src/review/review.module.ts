import { TypeOrmModule } from "@nestjs/typeorm";
import { ReviewController } from "./review.controller";
import { Review } from "./review.entity";
import { ReviewService } from "./review.service";
import { Module } from "@nestjs/common";

/**
 * Represents the Review module, responsible for handling reviews requests.
 */
@Module({
    imports: [TypeOrmModule.forFeature([Review])],
    controllers: [ReviewController],
    providers: [ReviewService],
  })
  export class ReviewModule {}
  
import { IsNumber, IsString, Max, Min } from 'class-validator';

/**
 * DTO for creating a review.
 */
export class CreateReviewDTO {
  @IsNumber(
    { allowInfinity: false, allowNaN: false, maxDecimalPlaces: 2 },
    { message: 'La puntuación debe ser numérica.' },
  )
  @Min(0.5, { message: 'La puntuación debe de desde 0,5' })
  @Max(5, { message: 'La puntuación debe de ser hasta 5' })
  score: number;

  @IsString({ message: 'La descripción debe ser un string' })
  description: string;
}

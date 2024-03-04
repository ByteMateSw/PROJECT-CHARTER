import { IsOptional, IsPositive, IsString, Max } from 'class-validator';

/**
 * Represents the data transfer object for updating a post.
 */
export class UpdatePostDto {

  /**
   * The title of the post.
   * @remarks
   * This field is optional.
   * Must be a string.
   */
  @IsOptional()
  @IsString({
    message: 'El título del post necesita ser una cadena de carácteres',
  })
  title?: string;

  /**
   * The description of the post.
   * @remarks
   * This field is optional.
   * Must be a string.
   */
  @IsOptional()
  @IsString({
    message: 'El título del post necesita ser una cadena de carácteres',
  })
  description?: string;

  /**
   * The price of the post.
   * @remarks
   * This field is optional.
   * Must be a positive number.
   * Must be less than 1000000.
   */
  @IsOptional()
  @IsPositive({ message: 'El precio debe ser un número positivo.' })
  @Max(1000000, { message: 'El precio no puede sobrepasar los $1000000' })
  price?: number;
}

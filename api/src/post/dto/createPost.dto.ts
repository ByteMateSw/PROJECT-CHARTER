import {
  IsDefined,
  IsEnum,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Max,
} from 'class-validator';
//import { WorkingMode } from '../enum/enum.post';

/**
 * Represents the data transfer object for create a post.
 */
export class CreatePostDto {
  /**
   * The title of the post.
   * @remarks
   * This field is required.
   * Must be a string.
   */
  @IsDefined({ message: 'El post necesita título' })
  @IsString({
    message: 'El título del post necesita ser una cadena de carácteres',
  })
  title: string;

  /**
   * The description of the post.
   * @remarks
   * This field is required.
   * Must be a string.
   */
  @IsDefined({ message: 'El post necesita título' })
  @IsString({
    message: 'El título del post necesita ser una cadena de carácteres',
  })
  description: string;

  @IsString()
  searchVector: string;

  @IsNumber()
  city: number;

  /**
   * The price of the post.
   * @remarks
   * This field is optional.
   * Must be a positive number.
   * Must be less than or equal to 1000000.
   */
  @IsOptional()
  @IsPositive({ message: 'El precio debe ser un número positivo.' })
  @Max(1000000, { message: 'El precio no puede sobrepasar los $1000000' })
  price?: number;

  // @IsEnum(WorkingMode)
  // @IsOptional()
  // workin_modality?: WorkingMode;
}

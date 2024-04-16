import { IsNumber, IsPositive } from 'class-validator';

export class CategoryDto {
  @IsNumber()
  @IsPositive()
  id: number;
}

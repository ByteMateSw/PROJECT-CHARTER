import { IsOptional, IsString, ValidateNested } from 'class-validator';
import { CategoryDto } from '../../category/dto/category.dto';
import { Type } from 'class-transformer';

/**
 * Data transfer object for creating an office.
 */
export class UpdateOfficeDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => CategoryDto)
  category: CategoryDto;
}

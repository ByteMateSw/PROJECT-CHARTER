import { Type } from 'class-transformer';
import { IsDefined, IsString, ValidateNested } from 'class-validator';
import { CategoryDto } from 'src/category/dto/category.dto';

/**
 * Data transfer object for creating an office.
 */
export class CreateOfficeDto {
  @IsString()
  name: string;

  @IsDefined()
  @ValidateNested()
  @Type(() => CategoryDto)
  category: CategoryDto;
}

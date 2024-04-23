import { IsOptional, IsString } from 'class-validator';

/**
 * Data transfer object for creating an office.
 */
export class UpdateOfficeDto {
  @IsOptional()
  @IsString()
  name: string;

}

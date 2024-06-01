import { IsString, IsInt, IsOptional } from 'class-validator';

export class CreateExperienceDTO {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  company: string;

  @IsOptional()
  startDate: Date;

  @IsOptional()
  endDate?: Date;

  @IsInt()
  userId: number;
}

export class UpdateExperienceDTO {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  company?: string;

  @IsOptional()
  startDate?: Date;

  @IsOptional()
  endDate?: Date;

  @IsInt()
  userId: number;
}

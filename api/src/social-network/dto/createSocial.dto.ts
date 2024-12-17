import { IsString, IsOptional, IsNumber } from 'class-validator';

export class CreateSocialNetworkDTO {
  @IsOptional()
  @IsString()
  instagram?: string;

  @IsOptional()
  @IsString()
  twitter?: string;

  @IsOptional()
  @IsString()
  facebook?: string;

  @IsOptional()
  @IsString()
  linkedin?: string;

  @IsNumber()
  userId: number;
}
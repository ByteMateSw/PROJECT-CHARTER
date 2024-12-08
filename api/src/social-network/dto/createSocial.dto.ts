import { IsString, IsOptional } from 'class-validator';

export class CreateSocialNetworkDTO {
  @IsOptional()
  @IsString()
  whatsapp?: string;

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

  @IsString()
  userId: string;
}

import { IsOptional, IsString } from "class-validator";

export class UpdateLocalizationDto {
  @IsOptional()
  @IsString()
  name?: string;
  
  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @IsString()
  country?: string;
  
  @IsOptional()
  @IsString()
  capital?: string;
}

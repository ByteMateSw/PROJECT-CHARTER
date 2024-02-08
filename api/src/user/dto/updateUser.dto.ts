import { IsNotEmpty , IsEmail, IsPhoneNumber, IsString, IsStrongPassword, IsOptional, IsDateString, IsAlpha } from "class-validator";

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @IsAlpha()    
  firstName?: string;
  
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @IsAlpha()
  lastName?: string;
  
  @IsOptional()
  @IsEmail()
  email?: string;
  
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @IsStrongPassword()
  password?: string;
  
  @IsOptional()
  @IsPhoneNumber()
  numberPhone?: string;
  
  @IsOptional()
  @IsDateString()
  birthday?: Date;
}
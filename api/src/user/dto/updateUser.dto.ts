import { IsNotEmpty , IsEmail, IsPhoneNumber, IsString, IsStrongPassword, IsOptional, IsDateString } from "class-validator";

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()    
  firstName?: string;
  
  @IsOptional()
  @IsString()
  @IsNotEmpty()
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
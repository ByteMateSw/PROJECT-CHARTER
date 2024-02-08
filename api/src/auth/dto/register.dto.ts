import { IsNotEmpty , IsEmail, IsPhoneNumber, IsString, IsStrongPassword, IsDateString } from "class-validator";

export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;
  
  @IsString()
  @IsNotEmpty()
  lastName: string;
  
  @IsEmail()
  email: string;
  
  @IsString()
  @IsNotEmpty()
  @IsStrongPassword()
  password: string;
  
  @IsPhoneNumber()
  numberPhone?: string;
  
  @IsDateString()
  birthday: Date;
}
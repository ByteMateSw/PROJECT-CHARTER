import { IsNotEmpty , IsEmail, IsDate, IsPhoneNumber, IsString, IsStrongPassword } from "class-validator";

export class CreateUserDto {
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
  
  @IsDate()
  birthday: Date;
}
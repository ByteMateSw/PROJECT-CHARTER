import {
  IsNotEmpty,
  IsEmail,
  IsPhoneNumber,
  IsString,
  IsStrongPassword,
  IsDateString,
  IsAlpha,
  MaxLength,
  IsOptional,
  IsNumberString,
} from 'class-validator';

export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  @IsAlpha()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  @IsAlpha()
  lastName: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  @IsStrongPassword()
  password: string;

  @IsOptional()
  @IsPhoneNumber()
  @MaxLength(15)
  numberPhone?: string;

  @IsNumberString()
  @MaxLength(15)
  dni: string;

  @IsDateString()
  birthday: Date;
}

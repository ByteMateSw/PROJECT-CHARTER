import {
  IsOptional,
  IsString,
  IsEmail,
  IsPhoneNumber,
} from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  firstName?: string;

  @IsOptional()
  @IsString()
  lastName?: string;

  @IsOptional()
  @IsString()
  username?: string;

  @IsOptional()
  @IsEmail({}, { message: 'Debe ser un email válido' })
  email?: string;

  @IsOptional()
  @IsPhoneNumber(null, {
    message: 'El número de teléfono debe de tener un formato válido',
  })
  numberPhone?: string;

  @IsOptional()
  @IsString()
  dni?: string;

  @IsOptional()
  photo?: CustomFile | any;

  @IsOptional()
  backgroundPhoto?: CustomFile | any;
}

interface CustomFile extends File {
  originalname: string;
  mimetype: string;
  buffer: Buffer;
}
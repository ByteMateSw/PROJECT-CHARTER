import { IsOptional, IsString } from 'class-validator';

export class UptadePostDto {
  @IsOptional()
  @IsString({
    message: 'El título del post necesita ser una cadena de carácteres',
  })
  title?: string;

  @IsOptional()
  @IsString({
    message: 'El título del post necesita ser una cadena de carácteres',
  })
  description?: string;
}

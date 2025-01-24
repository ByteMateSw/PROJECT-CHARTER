import { IsString } from 'class-validator';

export class CreateJobDTO {
  @IsString()
  title: string;

  @IsString()
  img: string;

  @IsString()
  user: number;
}

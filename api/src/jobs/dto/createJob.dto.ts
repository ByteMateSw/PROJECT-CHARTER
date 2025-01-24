import { IsString } from 'class-validator';

export class CreateJobDTO {
  @IsString()
  title: string;

  @IsString()
  img: CustomFile | any;

  @IsString()
  user: number;
}

interface CustomFile extends File {
  originalname: string;
  mimetype: string;
  buffer: Buffer;
}

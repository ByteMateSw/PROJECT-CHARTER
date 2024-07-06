import { IsString } from 'class-validator';

export class UserFilter {
  @IsString()
  habilities?: string;

  @IsString()
  location?: string;
}

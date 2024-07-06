import { IsInt, IsPositive } from 'class-validator';

export class UserPagination {
  @IsInt()
  @IsPositive()
  page: number;

  @IsInt()
  @IsPositive()
  limit: number;
}

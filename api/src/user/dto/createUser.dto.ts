export class CreateUserDto {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  numberPhone?: string;
  birthday: Date;
  location: string;
}
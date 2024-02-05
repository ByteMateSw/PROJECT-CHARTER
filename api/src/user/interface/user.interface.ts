export interface User {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  isAccountValidate: boolean;
  dniValidate: boolean;
  numberPhone: string;
  birthday: Date;
  location: string;
}
export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  numberPhone: string;
  birthday: string;
  dni: string;
  photo: null;
  city: null;
}

export type createSocialTypes = {
  userId: number,
  whatsapp?: string,
  instagram?: string,
  twitter?: string,
  facebook?: string,
  linkedin?: string,
  web?: string
}

export type updateSocialNetworkTypes = {
  whatsapp?: string,
  instagram?: string,
  twitter?: string,
  facebook?: string,
  linkedin?: string,
  web?: string
}

export type createJobTypes = {
  title: string,
  user: number
}
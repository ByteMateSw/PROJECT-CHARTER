import { DeepPartial } from 'typeorm';
import { User } from '../../src/user/user.entity';
import { Role } from '../../src/role/role.entity';
import { hashData } from '../../src/utils/tools/hash';
import { Role as RoleEnum } from '../../src/utils/enums/role.enum';

export const password = '1234';

export const role: DeepPartial<Role> = { name: RoleEnum.Admin };

export const userStub = async (): Promise<DeepPartial<User>> => {
  return {
    firstName: 'test',
    lastName: 'test',
    email: 'test@gmail.com',
    password: await hashData(password),
    birthday: new Date(),
    acceptedToS: true,
    dni: 'test',
    refreshToken: 'refsh',
    dniValidate: true,
    isDeleted: false,
    numberPhone: '123',
    isAccountValidate: true,
  };
};

export const userResponse = {
  id: 1,
  firstName: 'test',
  lastName: 'test',
  email: 'test@gmail.com',
  numberPhone: '123',
  birthday: '2024-02-22',
  dni: 'test',
  photo: null,
  city: null,
};

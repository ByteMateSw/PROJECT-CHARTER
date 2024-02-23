import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { DeepPartial, EntityManager, Repository } from 'typeorm';
import { User } from '../src/user/user.entity';
import { Role } from '../src/role/role.entity';
import { Role as RoleEnum } from '../src/utils/enums/role.enum';
import { AppModule } from '../src/app.module';
import { password, userResponse, userStub } from './stubs/user.stubs';
import { ResponseMessage } from '../src/utils/types/functions.type';

describe('UserController (e2e)', () => {
  let app: INestApplication;
  let userRepository: Repository<User>;
  let roleRepository: Repository<Role>;

  const defaultRole = RoleEnum.Admin;
  const defaultPassword = password;
  let access_token: string;
  let userId: number;

  const deleteMessage: ResponseMessage = {
    message: 'El usuario ha sido borrado correctamente',
  };
  const updateMessage: ResponseMessage = {
    message: 'El usuario se ha actualizado correctamente',
  };

  async function createUser(
    user: DeepPartial<User>,
    role: Role,
    userRepository: Repository<User>,
  ): Promise<DeepPartial<User>> {
    user = userRepository.create(user);
    user.role = role;
    return await userRepository.save(user);
  }

  async function createRole(
    role: DeepPartial<Role>,
    roleRepository: Repository<Role>,
  ): Promise<Role> {
    const userRole = roleRepository.create(role);
    return await roleRepository.save(userRole);
  }

  async function loginUser(user: DeepPartial<User>, password: string) {
    return await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: user.email, password })
      .expect(202);
  }

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    userRepository = moduleFixture.get('UserRepository');
    roleRepository = moduleFixture.get('RoleRepository');

    const role = await createRole({ name: defaultRole }, roleRepository);
    const user = await createUser(await userStub(), role, userRepository);

    userId = user.id;

    const loginResponse = await loginUser(user, defaultPassword);

    access_token = loginResponse.body.access_token;
  });

  afterAll(async () => {
    const entityManager = app.get<EntityManager>(EntityManager);
    const tableNames = entityManager.connection.entityMetadatas
      .map(entity => `"${entity.tableName}"`)
      .join(', ');

    await entityManager.query(
      `truncate ${tableNames} restart identity cascade;`,
    );

    await app.close();
  });

  it('/user (GET)', () => {
    return request(app.getHttpServer())
      .get('/user')
      .set('Authorization', 'Bearer ' + access_token)
      .expect(200)
      .expect([{ ...userResponse }]);
  });

  it('/user/:id (GET)', () => {
    return request(app.getHttpServer())
      .get(`/user/${userId}`)
      .set('Authorization', 'Bearer ' + access_token)
      .expect(200)
      .expect({ ...userResponse });
  });

  it('/user/:id (PATCH)', () => {
    return request(app.getHttpServer())
      .patch(`/user/${userId}`)
      .send({ email: 'Test2@gmail.com' })
      .set('Authorization', 'Bearer ' + access_token)
      .expect(200)
      .expect(updateMessage);
  });

  it('/user/:id (DELETE)', () => {
    return request(app.getHttpServer())
      .delete(`/user/${userId}`)
      .set('Authorization', 'Bearer ' + access_token)
      .expect(200)
      .expect(deleteMessage);
  });
});

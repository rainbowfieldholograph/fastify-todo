import { test } from 'tap';
import { buildServer } from 'server';
import { faker } from '@faker-js/faker';
import { User, UserModel } from 'database/models/user';

test('user login logic test', async () => {
  test('should login user successfully', async (t) => {
    const username = faker.internet.userName();
    const email = faker.internet.email();
    const password = faker.internet.password();

    const server = await buildServer();

    t.teardown(async () => {
      await server.close();
    });

    await server.inject({
      method: 'POST',
      url: '/user',
      payload: {
        email,
        password,
        username,
      },
    });

    const { statusCode, body: bodyJson } = await server.inject({
      method: 'POST',
      url: '/user/login',
      payload: {
        email,
        password,
      },
    });

    const body = JSON.parse(bodyJson);

    const { accessToken } = body;
    const verified = server.jwt.verify<User & { iat: number }>(accessToken);

    t.equal(statusCode, 200);
    t.equal(verified.email, email);
    t.equal(verified.username, username);
    t.equal(verified.password, undefined);
    t.hasProps(verified, ['_id', 'email', 'username', 'iat']);
    t.type(verified.iat, 'number');
  });

  test('should fail to login user with wrong password', async (t) => {
    const username = faker.internet.userName();
    const email = faker.internet.email();
    const password = faker.internet.password();

    const server = await buildServer();

    t.teardown(async () => {
      await UserModel.deleteMany({});
      await server.close();
    });

    await server.inject({
      method: 'POST',
      url: '/user',
      payload: {
        email,
        password,
        username,
      },
    });

    const wrongPassword = password + '123-wrong_password.9876';

    const { statusCode, body: bodyJson } = await server.inject({
      method: 'POST',
      url: '/user/login',
      payload: {
        email,
        password: wrongPassword,
      },
    });

    const body = JSON.parse(bodyJson);

    t.equal(statusCode, 401);
    t.equal(body.message, 'Invalid email or password');
  });
});

import { test } from 'tap';
import { buildServer } from '../../../server.js';
import { faker } from '@faker-js/faker';
import { User } from '../../../database/models/user.js';

test('should login user', async () => {
  test('given the email and password are correct', async (t) => {
    const username = faker.internet.userName();
    const email = faker.internet.email();
    const password = faker.internet.password();

    const server = buildServer();

    t.teardown(async () => {
      await User.deleteMany({});
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
    const verified = server.jwt.verify(accessToken);

    t.equal(statusCode, 200);
    t.equal(verified.email, email);
    t.equal(verified.username, username);
    t.type(verified.iat, 'number');
  });
  test('given the email and password are incorrect', async (t) => {});
});

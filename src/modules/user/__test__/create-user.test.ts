import { faker } from '@faker-js/faker';
import { test } from 'tap';
import { buildServer } from 'server';

test('create user logic test', async (t) => {
  t.test('should create user successfully', async (t) => {
    const server = await buildServer();

    t.teardown(async () => {
      await server.close();
    });

    const username = faker.internet.userName();
    const email = faker.internet.email();
    const password = faker.internet.password();

    const { statusCode, headers, ...response } = await server.inject({
      method: 'POST',
      url: '/user',
      payload: {
        email,
        password,
        username,
      },
    });

    const body = JSON.parse(response.body);

    t.equal(statusCode, 201);
    t.equal(headers['content-type'], 'application/json; charset=utf-8');
    t.hasProps(body, ['_id', 'email', 'username']);
    t.notOk(body.password);
    t.equal(body.username, username);
    t.equal(body.email, email);

    t.end();
  });

  test('should fail to create user without email', async (t) => {
    const server = await buildServer();

    t.teardown(async () => {
      await server.close();
    });

    const username = faker.internet.userName();
    const password = faker.internet.password();

    const { statusCode, ...response } = await server.inject({
      method: 'POST',
      url: '/user',
      payload: {
        password,
        username,
      },
    });

    const body = JSON.parse(response.body);

    t.equal(statusCode, 400);
    t.ok(body.error);

    t.end();
  });

  test('should fail to create user with bad email format', async (t) => {
    const server = await buildServer();

    t.teardown(async () => {
      await server.close();
    });

    const username = faker.internet.userName();
    const password = faker.internet.password();
    const email = 'testemail@123';

    const { statusCode, ...response } = await server.inject({
      method: 'POST',
      url: '/user',
      payload: {
        password,
        username,
        email,
      },
    });

    const body = JSON.parse(response.body);

    t.equal(statusCode, 400);
    t.ok(body.error);

    t.end();
  });

  t.end();
});

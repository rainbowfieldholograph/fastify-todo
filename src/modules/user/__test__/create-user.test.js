import { faker } from '@faker-js/faker';
import mongoose from 'mongoose';
import { test } from 'tap';
import { User } from '../../../models/user.js';
import { buildServer } from '../../../server.js';
import * as userService from '../user.service.js';

// POST /user/

test('should create user successfully', async (t) => {
  const username = faker.internet.userName();
  const email = faker.internet.email();
  const password = faker.internet.password();

  const server = buildServer();

  t.teardown(async () => {
    await User.deleteMany({});
    await mongoose.connection.close();
    server.close();
  });

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
  t.type(body.password, 'undefined');
  t.equal(body.username, username);
  t.equal(body.email, email);
});

test('should fail to create user', async (t) => {
  const username = faker.internet.userName();
  const password = faker.internet.password();

  const server = buildServer();

  t.teardown(async () => {
    await mongoose.connection.close();
    server.close();
  });

  const { statusCode, headers, ...response } = await server.inject({
    method: 'POST',
    url: '/user',
    payload: {
      password,
      username,
    },
  });

  const body = JSON.parse(response.body);

  t.equal(statusCode, 400);
  t.equal(body.message, "body must have required property 'email'");
});

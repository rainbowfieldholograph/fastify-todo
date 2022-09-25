import { faker } from '@faker-js/faker';
import mongoose from 'mongoose';
import { test } from 'tap';
import { buildServer } from '../../../server.js';
import * as userService from '../user.service.js';

// POST /user/

test('should create user successfully with mock data', async (t) => {
  const username = faker.internet.userName();
  const email = faker.internet.email();
  const password = faker.internet.password();

  const server = buildServer();

  t.teardown(() => {
    server.close();
    mongoose.connection.close();
  });

  const response = await server.inject({
    method: 'POST',
    url: '/user',
    payload: {
      email,
      password,
      username,
    },
  });

  t.equal(response.statusCode, 201);
  t.equal(response.headers['content-type'], 'application/json; charset=utf-8');
});

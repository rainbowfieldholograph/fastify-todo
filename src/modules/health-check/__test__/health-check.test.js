import mongoose from 'mongoose';
import { test } from 'tap';
import { buildServer } from '../../../server.js';

test('request the /healthcheck route', async (t) => {
  const server = buildServer();

  t.teardown(() => {
    mongoose.connection.close();
    server.close();
  });

  const { statusCode, body } = await server.inject({
    method: 'GET',
    url: '/healthcheck',
  });

  const bodyJson = JSON.parse(body);

  t.equal(statusCode, 200, 'return a status code of 200');
  t.same(bodyJson, { status: 'OK' }, 'should return object: status: "OK"');
});

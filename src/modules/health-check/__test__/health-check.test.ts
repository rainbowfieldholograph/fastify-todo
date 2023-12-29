import { test } from 'tap';
import { buildServer } from '../../../server';

test('request the /healthcheck route', async (t) => {
  const server = await buildServer();

  t.teardown(async () => {
    await server.close();
  });

  const { statusCode, body } = await server.inject({
    method: 'GET',
    url: '/healthcheck',
  });

  const bodyJson = JSON.parse(body);

  t.equal(statusCode, 200, 'return a status code of 200');
  t.same(bodyJson, { status: 'OK' }, 'should return object: status: "OK"');
});

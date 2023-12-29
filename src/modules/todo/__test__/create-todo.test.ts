import { buildServer } from '../../../server';
import { test } from 'tap';
import { faker } from '@faker-js/faker';

test('create todo logic test', async (t) => {
  t.test('should create todo successfully', async (t) => {
    const server = await buildServer();

    t.teardown(async () => {
      await server.close();
    });

    const title = faker.word.adjective(5);
    const description = faker.lorem.paragraphs();

    await server.inject({
      method: 'POST',
      url: '/todo',
      payload: {
        title,
        description,
      },
    });
  });

  t.end();
});

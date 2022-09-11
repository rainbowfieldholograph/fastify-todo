import fastifyPlugin from 'fastify-plugin';
import fastifyMongodb from '@fastify/mongodb';

const dbConnector = fastifyPlugin(async (server, options) => {
  const url = process.env.MONGODB_URL;

  server.register(fastifyMongodb, {
    url,
  });
});

export { dbConnector };

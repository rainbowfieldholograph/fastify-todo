import fastify from 'fastify';
import fastifyJwt from '@fastify/jwt';
import fastifyCors from '@fastify/cors';
import { todoRoutes } from './modules/todo/todo.route.js';
import { dbConnector } from './plugins/database.js';
import { helloRoute } from './modules/hello.route.js';
import { userRoutes } from './modules/user/user.route.js';

export const buildServer = () => {
  const fastifyServer = fastify({
    logger: true,
  });

  const jwtSecret = process.env.JWT_SECRET;
  const clientUrl = process.env.CLIENT_URL;

  fastifyServer.register(dbConnector);
  fastifyServer.register(todoRoutes, { prefix: '/todo' });
  fastifyServer.register(userRoutes, { prefix: '/user' });
  fastifyServer.register(helloRoute, { prefix: '/hello' });
  fastifyServer.register(fastifyJwt, {
    secret: jwtSecret,
  });
  fastifyServer.register(fastifyCors, {
    origin: clientUrl,
  });

  fastifyServer.decorate('authenticate', async (request, reply) => {
    try {
      await request.jwtVerify();
    } catch (error) {
      reply.send(error);
    }
  });

  fastifyServer.addHook('preHandler', (request, reply, next) => {
    request.jwt = fastifyServer.jwt;
    return next();
  });

  return fastifyServer;
};

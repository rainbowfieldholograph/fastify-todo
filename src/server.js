import fastify from 'fastify';
import fastifyJwt from '@fastify/jwt';
import fastifyCors from '@fastify/cors';
import { todoRoutes } from './modules/todo/todo.route.js';
import { healthCheckRoute } from './modules/health-check/health-check.route.js';
import { userRoutes } from './modules/user/user.route.js';
import { initConfig } from './utils/initConfig.js';
import { handleCloseApp } from './hooks/handleCloseApp.js';
import { jwtAuth } from './hooks/jwtAuth.js';
import { authenticate } from './decorators/authenticate.js';
import { connect } from './database/connect.js';

export const buildServer = async (options = {}) => {
  initConfig();

  const fastifyServer = fastify(options);

  await connect(fastifyServer);

  const { JWT_SECRET, CLIENT_URL } = process.env;

  fastifyServer.register(todoRoutes, { prefix: '/todo' });
  fastifyServer.register(userRoutes, { prefix: '/user' });
  fastifyServer.register(healthCheckRoute);
  fastifyServer.register(fastifyJwt, { secret: JWT_SECRET });
  fastifyServer.register(fastifyCors, { origin: CLIENT_URL });

  fastifyServer.decorate('authenticate', authenticate);

  fastifyServer.addHook('preHandler', jwtAuth);
  fastifyServer.addHook('onClose', handleCloseApp);

  return fastifyServer;
};

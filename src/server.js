import fastify from 'fastify';
import fastifyJwt from '@fastify/jwt';
import fastifyCors from '@fastify/cors';
import mongoose from 'mongoose';
import { todoRoutes } from './modules/todo/todo.route.js';
import { dbConnector } from './plugins/database.js';
import { healthCheckRoute } from './modules/health-check/health-check.route.js';
import { userRoutes } from './modules/user/user.route.js';
import { initConfig } from './utils/initConfig.js';

const connectDatabase = (server) => {
  mongoose.connection.on('connected', () => {
    server.log.info('MongoDB connected');
  });
  mongoose.connection.on('disconnected', () => {
    server.log.error('MongoDB disconnected');
  });

  const dbUrl = process.env.MONGODB_URL;
  mongoose.connect(dbUrl);
};

export const buildServer = (options = {}) => {
  initConfig();

  const fastifyServer = fastify(options);

  connectDatabase(fastifyServer);

  const jwtSecret = process.env.JWT_SECRET;
  const clientUrl = process.env.CLIENT_URL;

  fastifyServer.register(dbConnector);
  fastifyServer.register(todoRoutes, { prefix: '/todo' });
  fastifyServer.register(userRoutes, { prefix: '/user' });
  fastifyServer.register(healthCheckRoute);
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

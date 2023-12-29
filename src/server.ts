import fastify from 'fastify';
import jwt from '@fastify/jwt';
import cors from '@fastify/cors';
import { todoRoutes } from './modules/todo/route';
import { healthCheckRoute } from './modules/health-check/route';
import { userRoutes } from './modules/user/route';
import { initConfig } from './utils/init-config';
import { jwtAuth } from './hooks/jwt-auth';
import { authenticate } from './decorators/authenticate';
import { connectDatabase } from './database/connect';
import { closeDb } from './hooks/close-db';
import { jwtAuthDecoratorName } from './config';
import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';

export const buildServer = async (options = {}) => {
  initConfig();

  const app = fastify(options).withTypeProvider<TypeBoxTypeProvider>();

  const { JWT_SECRET, CLIENT_URL } = process.env;

  await connectDatabase(app);

  console.log('start');

  app.register(todoRoutes, { prefix: '/todo' });
  app.register(userRoutes, { prefix: '/user' });
  app.register(healthCheckRoute);

  app.register(jwt, { secret: JWT_SECRET!, decoratorName: jwtAuthDecoratorName });
  app.register(cors, { origin: CLIENT_URL! });

  app.decorate('authenticate', authenticate);

  app.addHook('preHandler', jwtAuth);
  app.addHook('onClose', closeDb);

  return app;
};

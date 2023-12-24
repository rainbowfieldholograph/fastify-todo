import fastify from 'fastify';
import jwt from '@fastify/jwt';
import cors from '@fastify/cors';
import { todoRoutes } from 'modules/todo/todo.route';
import { healthCheckRoute } from 'modules/health-check/health-check.route';
import { userRoutes } from 'modules/user/user.route';
import { initConfig } from 'utils/init-config';
import { jwtAuth } from 'hooks/jwt-auth';
import { authenticate } from 'decorators/authenticate';
import { connectDatabase } from 'database/connect';
import { closeDb } from 'hooks/close-db';
import {
  validatorCompiler,
  serializerCompiler,
  ZodTypeProvider,
} from 'fastify-type-provider-zod';
import { jwtAuthDecoratorName } from 'config';

export const buildServer = async (options = {}) => {
  initConfig();

  const app = fastify(options);

  app.setValidatorCompiler(validatorCompiler);
  app.setSerializerCompiler(serializerCompiler);
  app.withTypeProvider<ZodTypeProvider>();

  const { JWT_SECRET, CLIENT_URL } = process.env;

  await connectDatabase(app);

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

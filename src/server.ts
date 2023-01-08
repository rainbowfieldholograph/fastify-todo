import fastify from 'fastify';
import jwt from '@fastify/jwt';
import cors from '@fastify/cors';
import { todoRoutes } from 'modules/todo/todo.route';
import { healthCheckRoute } from 'modules/health-check/health-check.route';
import { userRoutes } from 'modules/user/user.route';
import { initConfig } from 'utils/init-config';
import { jwtAuth } from 'hooks/jwt-auth';
import { authenticate } from 'decorators/authenticate';
import { connect } from 'database/connect';
import { closeDb } from 'hooks/close-db';
import {
  validatorCompiler,
  serializerCompiler,
  ZodTypeProvider,
} from 'fastify-type-provider-zod';

export const buildServer = async (options = {}) => {
  initConfig();

  const fastifyServer = fastify(options);

  fastifyServer.setValidatorCompiler(validatorCompiler);
  fastifyServer.setSerializerCompiler(serializerCompiler);
  fastifyServer.withTypeProvider<ZodTypeProvider>();

  await connect(fastifyServer);

  const { JWT_SECRET, CLIENT_URL } = process.env;

  fastifyServer.register(todoRoutes, { prefix: '/todo' });
  fastifyServer.register(userRoutes, { prefix: '/user' });
  fastifyServer.register(healthCheckRoute);
  fastifyServer.register(jwt, { secret: JWT_SECRET! });
  fastifyServer.register(cors, { origin: CLIENT_URL! });

  fastifyServer.decorate('authenticate', authenticate);

  fastifyServer.addHook('preHandler', jwtAuth);
  fastifyServer.addHook('onClose', closeDb);

  return fastifyServer;
};

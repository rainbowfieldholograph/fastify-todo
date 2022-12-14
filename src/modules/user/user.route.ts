import { FastifyPluginAsync } from 'fastify';
import { createUserSchema, loginUserSchema } from './schemas';
import {
  createUserHandler,
  getAllUsersHandler,
  getUserHandler,
  loginUserHandler,
  removeSelfHandler,
} from './user.controller';

const userRoutes: FastifyPluginAsync = async (server) => {
  server.post('/login', { schema: loginUserSchema }, loginUserHandler);
  server.post('/', { schema: createUserSchema }, createUserHandler);
  server.get('/', { preHandler: [server.authenticate] }, getAllUsersHandler);
  server.get('/me', { preHandler: [server.authenticate] }, getUserHandler);
  server.delete('/', { preHandler: [server.authenticate] }, removeSelfHandler);
};

export { userRoutes };

import { FastifyPluginAsync } from 'fastify';
import { createUserSchema, loginUserSchema } from './schemas';
import { updateUserSchema } from './schemas/update-user.schema';
import {
  createUserHandler,
  getAllUsersHandler,
  getUserHandler,
  loginUserHandler,
  removeSelfHandler,
  updateSelfHandler,
} from './user.controller';

const userRoutes: FastifyPluginAsync = async (server) => {
  server.post('/login', { schema: loginUserSchema }, loginUserHandler);
  server.post('/', { schema: createUserSchema }, createUserHandler);
  server.get('/', { preHandler: [server.authenticate] }, getAllUsersHandler);
  server.get('/me', { preHandler: [server.authenticate] }, getUserHandler);
  server.delete('/me', { preHandler: [server.authenticate] }, removeSelfHandler);
  server.patch(
    '/me',
    { preHandler: [server.authenticate], schema: updateUserSchema },
    updateSelfHandler,
  );
};

export { userRoutes };

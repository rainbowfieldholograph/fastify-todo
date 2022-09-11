import {
  createUserHandler,
  getAllUsersHandler,
  getUserWithTodoHandler,
  loginUserHandler,
  removeSelfHandler,
} from './user.controller.js';
import { loginUserSchema, postUserSchema } from './user.schema.js';

const userRoutes = async (server) => {
  server.post('/login', { schema: loginUserSchema }, loginUserHandler);
  server.post('/', { schema: postUserSchema }, createUserHandler);
  server.get('/', { preHandler: [server.authenticate] }, getAllUsersHandler);
  server.get(
    '/me',
    { preHandler: [server.authenticate] },
    getUserWithTodoHandler
  );
  server.delete('/', { preHandler: [server.authenticate] }, removeSelfHandler);
};

export { userRoutes };

import { FastifyPluginAsync } from 'fastify';
import { createUserSchema, loginUserSchema } from './schemas';
import { patchUserSchema } from './schemas/patch-user.schema';
import {
  createUserHandler,
  getAllUsersHandler,
  getUserHandler,
  loginUserHandler,
  removeSelfHandler,
  updateSelfHandler,
} from './user.controller';

const userRoutes: FastifyPluginAsync = async (server) => {
  server.route({
    method: 'POST',
    url: '/login',
    schema: loginUserSchema,
    handler: loginUserHandler,
  });

  server.route({
    method: 'POST',
    url: '/',
    schema: createUserSchema,
    handler: createUserHandler,
  });

  server.route({
    method: 'GET',
    url: '/',
    preHandler: [server.authenticate],
    handler: getAllUsersHandler,
  });

  server.route({
    method: 'GET',
    url: '/me',
    preHandler: [server.authenticate],
    handler: getUserHandler,
  });

  server.route({
    method: 'DELETE',
    url: '/me',
    preHandler: [server.authenticate],
    handler: removeSelfHandler,
  });

  server.route({
    method: 'PATCH',
    url: '/me',
    preHandler: [server.authenticate],
    schema: patchUserSchema,
    handler: updateSelfHandler,
  });
};

export { userRoutes };

import { FastifyPluginAsync } from 'fastify';
import { signUpSchema, loginUserSchema } from './schemas';
import { patchUserSchema } from './schemas/patch-user.schema';
import {
  signUp,
  getAllUsers,
  getUser,
  login,
  removeSelf,
  updateSelf,
} from './user.controller';

const userRoutes: FastifyPluginAsync = async (server) => {
  server.route({
    method: 'POST',
    url: '/login',
    schema: loginUserSchema,
    handler: login,
  });

  server.route({
    method: 'POST',
    url: '/sign-up',
    schema: signUpSchema,
    handler: signUp,
  });

  server.route({
    method: 'GET',
    url: '/',
    preHandler: [server.authenticate],
    handler: getAllUsers,
  });

  server.route({
    method: 'GET',
    url: '/me',
    preHandler: [server.authenticate],
    handler: getUser,
  });

  server.route({
    method: 'DELETE',
    url: '/me',
    preHandler: [server.authenticate],
    handler: removeSelf,
  });

  server.route({
    method: 'PATCH',
    url: '/me',
    preHandler: [server.authenticate],
    schema: patchUserSchema,
    handler: updateSelf,
  });
};

export { userRoutes };

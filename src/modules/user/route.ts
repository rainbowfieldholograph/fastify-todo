import {
  signUp,
  getAllUsers,
  getUser,
  login,
  removeSelf,
  updateSelf,
} from './controller';
import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import * as schemas from './schemas';

const protectedRoutes: FastifyPluginAsyncTypebox = async (server) => {
  server.addHook('onRequest', server.authenticate);

  server.get('/', getAllUsers);
  server.get('/me', getUser);
  server.delete('/me', removeSelf);
  server.patch('/me', updateSelf);
};

const userRoutes: FastifyPluginAsyncTypebox = async (server) => {
  server.post('/login', { schema: { body: schemas.loginUserBody } }, login);
  server.post('/sign-up', { schema: { body: schemas.signUpUserBody } }, signUp);
  server.register(protectedRoutes);
};

export { userRoutes };

import { JWT } from '@fastify/jwt';
import { preHandlerHookHandler } from 'fastify';

const jwtAuth: preHandlerHookHandler = function (request, reply, next) {
  const server = this;

  request.jwt = server.jwt;

  return next();
};

declare module 'fastify' {
  interface FastifyRequest {
    jwt: JWT;
  }
}

export { jwtAuth };

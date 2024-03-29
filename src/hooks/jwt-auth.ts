import { JWT } from '@fastify/jwt';
import { preHandlerHookHandler } from 'fastify';

export const jwtAuth: preHandlerHookHandler = function (request, _reply, next) {
  request.jwt = this.jwt;

  return next();
};

declare module 'fastify' {
  interface FastifyRequest {
    jwt: JWT;
  }
}

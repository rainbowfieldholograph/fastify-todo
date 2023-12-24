import { jwtAuthDecoratorName } from 'config';
import { User } from 'database/models/user';
import { FastifyReply, FastifyRequest } from 'fastify';

export async function authenticate(request: FastifyRequest, reply: FastifyReply) {
  try {
    await request.jwtVerify<User>();
  } catch (error) {
    reply.send(error);
  }
}

declare module 'fastify' {
  interface FastifyInstance {
    authenticate: typeof authenticate;
  }
}

declare module 'fastify' {
  interface FastifyRequest {
    [jwtAuthDecoratorName]?: User;
  }
}

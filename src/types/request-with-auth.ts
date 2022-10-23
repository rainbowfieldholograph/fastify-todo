import { User } from 'database/models/user';
import { FastifyRequest, RouteGenericInterface } from 'fastify';

export interface RequestWithAuth<T extends RouteGenericInterface = RouteGenericInterface>
  extends FastifyRequest<T> {
  user: User;
}

import { FastifyPluginAsync } from 'fastify';
import { postTodoSchema, patchTodoSchema, putTodoSchema } from './schemas';
import {
  createTodoHandler,
  getTodoByIdHandler,
  getUserTodosHandler,
  removeTodoHandler,
  updateTodoHandler,
} from './todo.controller';

const todoRoutes: FastifyPluginAsync = async (server, options) => {
  server.addHook('onRequest', server.authenticate); // validate authentication

  server.route({
    url: '/',
    method: 'GET',
    handler: getUserTodosHandler,
  });

  server.route({
    url: '/:id',
    method: 'GET',
    handler: getTodoByIdHandler,
  });

  server.route({
    url: '/',
    method: 'POST',
    schema: postTodoSchema,
    handler: createTodoHandler,
  });

  server.route({
    url: '/:id',
    method: 'DELETE',
    handler: removeTodoHandler,
  });

  server.route({
    url: '/:id',
    method: 'PATCH',
    schema: patchTodoSchema,
    handler: updateTodoHandler,
  });

  server.route({
    url: '/:id',
    method: 'PUT',
    schema: putTodoSchema,
    handler: updateTodoHandler,
  });
};

export { todoRoutes };

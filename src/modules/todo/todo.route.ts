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

  server.get('/', getUserTodosHandler);
  server.get('/:id', getTodoByIdHandler);
  server.post('/', { schema: postTodoSchema }, createTodoHandler);
  server.delete('/:id', removeTodoHandler);
  server.patch('/:id', { schema: patchTodoSchema }, updateTodoHandler);
  server.put('/:id', { schema: putTodoSchema }, updateTodoHandler);
};

export { todoRoutes };

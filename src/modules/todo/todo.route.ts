import { FastifyPluginAsync } from 'fastify';
import {
  postTodoSchema,
  patchTodoSchema,
  putTodoSchema,
  getAllTodosSchema,
} from './schemas';
import {
  createTodo,
  getTodoById,
  getUserTodos,
  removeTodo,
  updateTodo,
} from './todo.controller';

const todoRoutes: FastifyPluginAsync = async (app, _options) => {
  app.addHook('onRequest', app.authenticate); // validate authentication
  app.get('/', { schema: getAllTodosSchema }, getUserTodos);
  app.get('/:id', getTodoById);
  app.post('/', { schema: postTodoSchema }, createTodo);
  app.delete('/:id', removeTodo);
  app.patch('/:id', { schema: patchTodoSchema }, updateTodo);
  app.put('/:id', { schema: putTodoSchema }, updateTodo);
};

export { todoRoutes };

import { FastifyPluginAsync } from 'fastify';
import * as schemas from './schemas';
import {
  createTodo,
  getTodoById,
  getUserTodos,
  removeTodo,
  updateTodo,
} from './controller';

const todoRoutes: FastifyPluginAsync = async (app, _options) => {
  app.addHook('onRequest', app.authenticate); // validate authentication
  app.get('/', { schema: { querystring: schemas.getAllTodosQuerystring } }, getUserTodos);
  app.get('/:id', { schema: schemas.getTodoParams }, getTodoById);
  app.post('/', { schema: { body: schemas.postTodoBody } }, createTodo);
  app.delete('/:id', { schema: { params: schemas.removeTodoParams } }, removeTodo);
  app.patch(
    '/:id',
    { schema: { body: schemas.patchTodoBody, params: schemas.patchTodoParams } },
    updateTodo,
  );
  app.put(
    '/:id',
    { schema: { body: schemas.putTodoBody, params: schemas.putTodoParams } },
    updateTodo,
  );
};

export { todoRoutes };

import {
  createTodoHandler,
  getAllTodoHandler,
  getTodoByIdHandler,
  removeTodoHandler,
  updateTodoHandler,
} from './todo.controller.js';
import {
  patchTodoSchema,
  postTodoSchema,
  putTodoSchema,
} from './todo.schema.js';

const todoRoutes = async (server, options) => {
  server.addHook('onRequest', server.authenticate); // validate authentication

  server.get('/', getAllTodoHandler);
  server.get('/:id', getTodoByIdHandler);
  server.post('/', { schema: postTodoSchema }, createTodoHandler);
  server.delete('/:id', removeTodoHandler);
  server.patch('/:id', { schema: patchTodoSchema }, updateTodoHandler);
  server.put('/:id', { schema: putTodoSchema }, updateTodoHandler);
};

export { todoRoutes };

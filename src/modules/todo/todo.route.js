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
  server.get('/', { preHandler: [server.authenticate] }, getAllTodoHandler);
  server.get('/:id', { preHandler: [server.authenticate] }, getTodoByIdHandler);
  server.post(
    '/',
    { preHandler: [server.authenticate], schema: postTodoSchema },
    createTodoHandler
  );
  server.delete(
    '/:id',
    { preHandler: [server.authenticate] },
    removeTodoHandler
  );
  server.patch(
    '/:id',
    { preHandler: [server.authenticate], schema: patchTodoSchema },
    updateTodoHandler
  );
  server.put(
    '/:id',
    { preHandler: [server.authenticate], schema: putTodoSchema },
    updateTodoHandler
  );
};

export { todoRoutes };

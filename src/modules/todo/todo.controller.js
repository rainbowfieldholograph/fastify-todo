import {
  createTodo,
  getAllTodo,
  getTodoById,
  removeTodo,
  updateTodo,
} from './todo.service.js';

const getAllTodoHandler = async (request, reply) => {
  const result = await getAllTodo();
  if (result.length === 0) throw new Error('No documents found');
  return result;
};

const getTodoByIdHandler = async (request, reply) => {
  const { id } = request.params;
  const { user } = request;

  const result = await getTodoById(id);
  if (user._doc._id !== result.creatorId) {
    throw new Error('No access');
  }

  if (!result) throw new Error('Invalid value');
  return result;
};

const createTodoHandler = async (request, reply) => {
  const { body, user } = request;

  const candidate = { ...body, completed: false, creatorId: user._doc._id };
  return await createTodo(candidate);
};

const removeTodoHandler = async (request, reply) => {
  const { id } = request.params;
  const { user } = request;

  const todoToDelete = await getTodoById(id);
  if (user._doc._id !== todoToDelete.creatorId) {
    throw new Error('No access');
  }

  const todoToRemove = await removeTodo(id);
  if (!todoToRemove) throw new Error('Invalid value');
  return todoToRemove;
};

const updateTodoHandler = async (request, reply) => {
  const { body, params, user } = request;
  const { id } = params;

  const todoToUpdate = await getTodoById(id);
  if (user._doc._id !== todoToUpdate.creatorId) {
    throw new Error('No access');
  }

  const updated = await updateTodo(id, { ...body });
  if (!updated) throw new Error('Not found');
  return updated;
};

export {
  createTodoHandler,
  getAllTodoHandler,
  getTodoByIdHandler,
  removeTodoHandler,
  updateTodoHandler,
};

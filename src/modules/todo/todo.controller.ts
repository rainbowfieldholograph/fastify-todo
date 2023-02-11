import { FastifyReply, FastifyRequest } from 'fastify';
import { PatchTodoParams, PostTodo } from './schemas';
import {
  createTodo,
  getAllTodo,
  getTodoById,
  getUserTodos,
  removeTodo,
  updateTodo,
} from './todo.service';

const getAllTodoHandler = async (request: FastifyRequest, reply: FastifyReply) => {
  const result = await getAllTodo();

  if (result.length === 0) throw new Error('No documents found');

  return result;
};

const getTodoByIdHandler = async (request: FastifyRequest, reply: FastifyReply) => {
  const { id } = request.params as any;
  const { user } = request as any;

  const result = await getTodoById(id);
  const userId = user._id.toString();

  if (!result) throw new Error('Invalid value');

  const creatorId = result.creatorId.toString();

  if (userId !== creatorId) throw new Error('No access');

  return result;
};

const createTodoHandler = async (
  request: FastifyRequest<{ Body: PostTodo }>,
  reply: FastifyReply,
) => {
  const { body, user } = request as any;

  const candidate = { ...body, completed: false, creatorId: user._id };
  const createdUser = await createTodo(candidate);

  return createdUser;
};

const removeTodoHandler = async (
  request: FastifyRequest<{ Body: PostTodo }>,
  reply: FastifyReply,
) => {
  const { id } = request.params as any;
  const { user } = request as any;

  const todoToDelete = await getTodoById(id);
  const userId = user._id;

  if (!todoToDelete) throw new Error('Invalid value');

  const creatorId = todoToDelete.creatorId.toString();

  if (userId.toString() !== creatorId) throw new Error('No access');

  const todoToRemove = await removeTodo(id);
  if (!todoToRemove) throw new Error('Invalid value');
  return todoToRemove;
};

const updateTodoHandler = async (
  request: FastifyRequest<{ Params: PatchTodoParams }>,
  reply: FastifyReply,
) => {
  const { body, params, user } = request as any;
  const { id } = params;

  const todoToUpdate = await getTodoById(id);
  const userId = user._id;

  if (!todoToUpdate) throw new Error('Not found');

  const creatorId = todoToUpdate.creatorId.toString();

  if (userId.toString() !== creatorId) throw new Error('No access');

  const updated = await updateTodo(id, body);
  // if (!updated) throw new Error('Not found');
  return updated;
};

const getUserTodosHandler = async (request: any, response: any) => {
  const { user } = request as any;

  const todos = await getUserTodos(user._id);

  if (!todos) throw new Error('Todos cant be found');

  return todos;
};

export {
  createTodoHandler,
  getTodoByIdHandler,
  removeTodoHandler,
  updateTodoHandler,
  getUserTodosHandler,
};

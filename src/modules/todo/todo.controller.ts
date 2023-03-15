import { User } from 'database/models/user';
import { FastifyReply, FastifyRequest } from 'fastify';
import {
  GetAllTodosQuerystring,
  PatchTodoBody,
  PatchTodoParams,
  PostTodo,
} from './schemas';
import {
  createTodo,
  getAllTodo,
  getTodoById,
  getUserTodos,
  removeTodo,
  updateTodo,
} from './todo.service';
import { splitSortValue } from './utils';

const getAllTodoHandler = async (request: FastifyRequest, reply: FastifyReply) => {
  const result = await getAllTodo();

  if (result.length === 0) throw new Error('No documents found');

  return result;
};

const getTodoByIdHandler = async (
  request: FastifyRequest<{ Params: { id: string } }>,
) => {
  const { id } = request.params;
  const user = request.user as User;

  const foundTodo = await getTodoById(id);
  const userId = user._id.toString();

  if (!foundTodo) throw new Error('Invalid value');

  const creatorId = foundTodo.creatorId.toString();

  if (userId !== creatorId) throw new Error('No access');

  return foundTodo;
};

const createTodoHandler = async (request: FastifyRequest<{ Body: PostTodo }>) => {
  const { body, user } = request as any;

  const candidate = { ...body, completed: false, creatorId: user._id };
  const createdUser = await createTodo(candidate);

  return createdUser;
};

const removeTodoHandler = async (request: FastifyRequest<{ Params: { id: string } }>) => {
  const { id } = request.params;
  const user = request.user as User;

  const todoToDelete = await getTodoById(id);

  if (!todoToDelete) throw new Error('Invalid value');

  const userId = user._id.toString();
  const creatorId = todoToDelete.creatorId.toString();

  if (userId !== creatorId) {
    throw new Error('No access');
  }

  const todoToRemove = await removeTodo(id);
  if (!todoToRemove) throw new Error('Invalid value');

  return todoToRemove;
};

const updateTodoHandler = async (
  request: FastifyRequest<{ Params: PatchTodoParams; Body: PatchTodoBody }>,
) => {
  const { body, params } = request;
  const { id } = params;
  const user = request.user as User;

  const todoToUpdate = await getTodoById(id);

  if (!todoToUpdate) throw new Error('Not found');

  const userId = user._id.toString();
  const creatorId = todoToUpdate.creatorId.toString();

  if (userId !== creatorId) throw new Error('No access');

  const updated = await updateTodo(id, body);
  return updated;
};

const getUserTodosHandler = async (
  request: FastifyRequest<{ Querystring: GetAllTodosQuerystring }>,
) => {
  const user = request.user as User;
  const { sort } = request.query;

  const todos = await getUserTodos({
    userId: user._id.toString(),
    sort: sort && splitSortValue(sort),
  });

  return todos;
};

export {
  createTodoHandler,
  getTodoByIdHandler,
  removeTodoHandler,
  updateTodoHandler,
  getUserTodosHandler,
};

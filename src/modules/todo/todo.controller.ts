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

const _getAllTodoHandler = async (_request: FastifyRequest, _reply: FastifyReply) => {
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { body, user } = request as any;

  const candidate = { ...body, completed: false, creatorId: user._id };
  const createdUser = await createTodo(candidate);

  return createdUser;
};

const removeTodoHandler = async (request: FastifyRequest<{ Params: { id: string } }>) => {
  try {
    const { id } = request.params;
    const user = request.user as User;

    if (request.raw.aborted) {
      throw new Error('Aborted');
    }

    const todoToDelete = await getTodoById(id);
    if (!todoToDelete) throw new Error('Invalid value');

    const userId = user._id.toString();
    const creatorId = todoToDelete.creatorId.toString();

    if (userId !== creatorId) {
      throw new Error('No access');
    }

    const todoToRemove = await removeTodo(id);

    return todoToRemove;
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
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
  const { sortBy, sortType } = request.query;

  const requestParams = { userId: user._id.toString() };
  if (sortBy && sortType) {
    Object.defineProperty(requestParams, 'sort', { value: { sortBy, sortType } });
  }

  const todos = await getUserTodos(requestParams);
  return todos;
};

export {
  createTodoHandler,
  getTodoByIdHandler,
  removeTodoHandler,
  updateTodoHandler,
  getUserTodosHandler,
};

import { RouteHandler } from 'fastify';
import {
  GetAllTodosQuerystring,
  PatchTodoBody,
  PatchTodoParams,
  PostTodo,
} from './schemas';
import * as service from './todo.service';
import createHttpError from 'http-errors';

// const _getAllTodo: RouteHandler = async () => {
//   const result = await service.getAllTodo();
//   if (result.length === 0) throw new Error('No documents found');

//   return result;
// };

export const getTodoById: RouteHandler<{
  Params: { id: string };
}> = async (request, reply) => {
  const { currentUser, params } = request;
  if (!currentUser) return reply.send(createHttpError.Unauthorized());

  const foundTodo = await service.getTodoById(params.id);
  const userId = currentUser._id.toString();
  if (!foundTodo) return reply.send(createHttpError.NotFound('Todo not found'));

  const creatorId = foundTodo.creatorId.toString();
  if (userId !== creatorId) return reply.send(createHttpError.Forbidden('No access'));

  return foundTodo;
};

export const createTodo: RouteHandler<{ Body: PostTodo }> = async (request, reply) => {
  const { body, currentUser } = request;

  if (!currentUser) return reply.send(createHttpError.Unauthorized());

  const candidate = { ...body, completed: false, creatorId: currentUser._id };
  const createdUser = await service.createTodo(candidate);

  return createdUser;
};

export const removeTodo: RouteHandler<{ Params: { id: string } }> = async (
  request,
  reply,
) => {
  const { id } = request.params;

  const todoToRemove = await service.removeTodo(id);
  if (!todoToRemove) return reply.send(createHttpError.NotFound('Todo not found'));

  return todoToRemove;
};

export const updateTodo: RouteHandler<{
  Params: PatchTodoParams;
  Body: PatchTodoBody;
}> = async (request, reply) => {
  const { body, params, currentUser } = request;
  const { id } = params;

  const todoToUpdate = await service.getTodoById(id);
  if (!todoToUpdate) return reply.send(createHttpError.NotFound('Todo not found'));

  const userId = currentUser?._id.toString();
  const creatorId = todoToUpdate.creatorId.toString();

  if (userId !== creatorId) return reply.send(createHttpError.Forbidden('No access'));

  const updated = await service.updateTodo(id, body);
  return updated;
};

export const getUserTodos: RouteHandler<{ Querystring: GetAllTodosQuerystring }> = async (
  request,
  reply,
) => {
  const { sortBy, sortType } = request.query;
  const { currentUser } = request;

  if (!currentUser) return reply.send(createHttpError.Unauthorized());
  const requestParams = { userId: currentUser._id.toString() };
  if (sortBy && sortType) {
    Object.defineProperty(requestParams, 'sort', { value: { sortBy, sortType } });
  }

  const todos = await service.getUserTodos(requestParams);
  return todos;
};

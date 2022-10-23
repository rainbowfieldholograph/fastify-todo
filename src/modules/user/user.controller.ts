import { FastifyRequest } from 'fastify';
import { FastifyReply } from 'fastify';
import { RouteHandler } from 'fastify';
import {
  createUser,
  getAllUsers,
  getUserWithTodo,
  removeUser,
  verifyUser,
} from './user.service';

const createUserHandler: RouteHandler = async (request, reply) => {
  const { body } = request;

  try {
    const newUser = await createUser(body);

    reply.code(201).send(newUser);
  } catch (error) {
    if (error.code === 11000) {
      throw new Error('This email is not available');
    }

    throw new Error(error.message);
  }
};

const loginUserHandler = async (
  request: FastifyRequest<{ Body: { email: string; password: string } }>,
  reply: FastifyReply,
) => {
  const { jwt, body } = request;
  const { email, password } = body;

  const user = await verifyUser(email, password);

  if (!user) {
    reply.code(401).send({ message: 'Invalid email or password' });
  }

  const accessToken = jwt.sign(user!);

  return { accessToken };
};

const getAllUsersHandler: RouteHandler = async (request, reply) => {
  const users = await getAllUsers();

  return users;
};

const getUserWithTodoHandler: RouteHandler = async (request, reply) => {
  const { user } = request as any;

  const userWithTodo = await getUserWithTodo(user._id);

  if (!userWithTodo) throw new Error('Not found');

  return userWithTodo;
};

const removeSelfHandler: RouteHandler = async (request, reply) => {
  const { user } = request as any;

  return removeUser(user._id);
};

export {
  createUserHandler,
  loginUserHandler,
  getAllUsersHandler,
  getUserWithTodoHandler,
  removeSelfHandler,
};

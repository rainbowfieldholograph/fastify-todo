import { User } from 'database/models/user';
import { FastifyRequest } from 'fastify';
import { FastifyReply } from 'fastify';
import { RouteHandler } from 'fastify';
import {
  createUser,
  getAllUsers,
  getUser,
  removeUser,
  updateUser,
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

const getUserHandler: RouteHandler = async (request, reply) => {
  const { user } = request as any;

  const foundUser = await getUser(user._id);

  if (!foundUser) throw new Error('User not found');

  return foundUser;
};

const removeSelfHandler: RouteHandler = async (request, reply) => {
  const { user } = request as any;

  const removedUser = await removeUser(user._id);

  if (!removedUser) throw new Error('User not found');

  return removedUser;
};

const updateSelfHandler = async (request: FastifyRequest) => {
  const body = request.body as User;
  const user = request.user as User;

  const updatedUser = updateUser(user._id, body);

  if (!updatedUser) throw new Error('User not found');

  return updatedUser;
};

export {
  createUserHandler,
  loginUserHandler,
  getAllUsersHandler,
  removeSelfHandler,
  getUserHandler,
  updateSelfHandler,
};

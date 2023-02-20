import { User } from 'database/models/user';
import { FastifyRequest, FastifyReply, RouteHandler } from 'fastify';
import { CreateUserBody, LoginUserBody, PatchUserBody } from './schemas';
import {
  createUser,
  getAllUsers,
  getUser,
  removeUser,
  updateUser,
  verifyUser,
} from './user.service';

const createUserHandler = async (
  request: FastifyRequest<{ Body: CreateUserBody }>,
  reply: FastifyReply,
) => {
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
  request: FastifyRequest<{ Body: LoginUserBody }>,
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
  const user = request.user as User;

  const foundUser = await getUser(user._id.toString());

  if (!foundUser) throw new Error('User not found');

  return foundUser;
};

const removeSelfHandler: RouteHandler = async (request, reply) => {
  const user = request.user as User;

  const removedUser = await removeUser(user._id.toString());

  if (!removedUser) throw new Error('User not found');

  return removedUser;
};

const updateSelfHandler = async (request: FastifyRequest<{ Body: PatchUserBody }>) => {
  const { body } = request;
  const user = request.user as User;

  const updatedUser = updateUser(user._id.toString(), body);

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

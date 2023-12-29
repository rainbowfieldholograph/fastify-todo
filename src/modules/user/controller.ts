import { FastifyReply, FastifyRequest } from 'fastify';
import * as service from './service';
import * as schemas from './schemas';
import createHttpError from 'http-errors';
import { Static } from '@sinclair/typebox';

export const signUp = async (
  request: FastifyRequest<{ Body: Static<typeof schemas.signUpUserBody> }>,
  reply: FastifyReply,
) => {
  const { body, jwt } = request;

  try {
    const createdUser = await service.createUser(body);
    const verifiedUser = await service.verifyUser({
      email: body.email,
      password: body.password,
    });

    const accessToken = jwt.sign(verifiedUser!);
    return reply.code(201).send({ ...createdUser, accessToken });
  } catch (error) {
    if (error.code === 11000) {
      return reply.send(createHttpError.Conflict('This email is not available'));
    }

    return reply.send(createHttpError.InternalServerError());
  }
};

export const login = async (
  request: FastifyRequest<{ Body: Static<typeof schemas.loginUserBody> }>,
  reply: FastifyReply,
) => {
  const { jwt, body } = request;
  const { email, password } = body;

  const user = await service.verifyUser({ email, password });
  if (!user) return reply.send(createHttpError.Unauthorized('Invalid email or password'));

  const accessToken = jwt.sign(user);
  return { accessToken };
};

export const getAllUsers = async (_request: FastifyRequest, _reply: FastifyReply) => {
  const users = await service.getAllUsers();

  return users;
};

export const getUser = async (request: FastifyRequest, reply: FastifyReply) => {
  const { currentUser } = request;
  if (!currentUser) return reply.send(createHttpError.Unauthorized());

  const foundUser = await service.getUser(currentUser._id.toString());
  if (!foundUser) return reply.send(createHttpError.NotFound('User not found'));

  return foundUser;
};

export const removeSelf = async (request: FastifyRequest, reply: FastifyReply) => {
  const { currentUser } = request;
  if (!currentUser) return reply.send(createHttpError.Unauthorized());

  const removedUser = await service.removeUser(currentUser._id.toString());
  if (!removedUser) return reply.send(createHttpError.NotFound('User not found'));

  return removedUser;
};

export const updateSelf = async (
  request: FastifyRequest<{ Body: Static<typeof schemas.patchUserBody> }>,
  reply: FastifyReply,
) => {
  const { body, currentUser } = request;
  if (!currentUser) return reply.send(createHttpError.Unauthorized());

  const updatedUser = await service.updateUser(currentUser._id.toString(), body);
  if (!updatedUser) return reply.send(createHttpError.NotFound('User not found'));

  return updatedUser;
};

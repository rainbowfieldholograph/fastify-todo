import { RouteHandler } from 'fastify';
import { SignupUserBody, LoginUserBody, PatchUserBody } from './schemas';
import * as service from './user.service';
import createHttpError from 'http-errors';

export const signUp: RouteHandler<{ Body: SignupUserBody }> = async (request, reply) => {
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

export const login: RouteHandler<{ Body: LoginUserBody }> = async (request, reply) => {
  const { jwt, body } = request;
  const { email, password } = body;

  const user = await service.verifyUser({ email, password });
  if (!user) return reply.send(createHttpError.Unauthorized('Invalid email or password'));

  const accessToken = jwt.sign(user);
  return { accessToken };
};

export const getAllUsers: RouteHandler = async (_request, _reply) => {
  const users = await service.getAllUsers();

  return users;
};

export const getUser: RouteHandler = async (request, reply) => {
  const { currentUser } = request;
  if (!currentUser) return createHttpError.Unauthorized();

  const foundUser = await service.getUser(currentUser._id.toString());
  if (!foundUser) return reply.send(createHttpError.NotFound('User not found'));

  return foundUser;
};

export const removeSelf: RouteHandler = async (request, reply) => {
  const { currentUser } = request;
  if (!currentUser) return reply.send(createHttpError.Unauthorized());

  const removedUser = await service.removeUser(currentUser._id.toString());
  if (!removedUser) return reply.send(createHttpError.NotFound('User not found'));

  return removedUser;
};

export const updateSelf: RouteHandler<{ Body: PatchUserBody }> = async (
  request,
  reply,
) => {
  const { body, currentUser } = request;
  if (!currentUser) return reply.send(createHttpError.Unauthorized());

  const updatedUser = service.updateUser(currentUser._id.toString(), body);
  if (!updatedUser) return reply.send(createHttpError.NotFound('User not found'));

  return updatedUser;
};

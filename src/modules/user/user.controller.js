import {
  createUser,
  getAllUsers,
  getUserWithTodo,
  removeUser,
  verifyUser,
} from './user.service.js';

const createUserHandler = async (request, reply) => {
  const { body } = request;
  try {
    const newUser = await createUser({ ...body });

    reply.statusCode = 201;

    return newUser;
  } catch (error) {
    if (error.code === 11000) {
      throw new Error('This email is not available');
    }

    throw new Error(error.message);
  }
};

const loginUserHandler = async (request, reply) => {
  const { jwt, body } = request;
  const { email, password } = body;

  const user = await verifyUser(email, password);

  if (!user) {
    return reply.code(401).send({
      message: 'Invalid email or password',
    });
  }

  const accessToken = jwt.sign({ ...user });
  return { accessToken };
};

const getAllUsersHandler = async (request, reply) => {
  const users = await getAllUsers();
  return users;
};

const getUserWithTodoHandler = async (request, reply) => {
  const { user } = request;
  const userWithTodo = await getUserWithTodo(user._doc._id);
  if (!userWithTodo) throw new Error('Not found');
  return userWithTodo;
};

const removeSelfHandler = async (request, reply) => {
  const { user } = request;

  return removeUser(user._doc._id);
};

export {
  createUserHandler,
  loginUserHandler,
  getAllUsersHandler,
  getUserWithTodoHandler,
  removeSelfHandler,
};

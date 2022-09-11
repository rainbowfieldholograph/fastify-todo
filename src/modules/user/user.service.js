import { ObjectId } from '@fastify/mongodb';
import { TODO_COLLECTION } from '../../models/constants.js';
import { User } from '../../models/user.js';
import {
  USER_RETURN_FIELDS,
  USER_WITH_TODO_RETURN_FIELDS,
  TODO_FIELD,
} from './user.constants.js';

const verifyUser = async (email, password) => {
  return await User.findOne({
    email,
    password,
  });
};

const createUser = async (input) => {
  const newUser = new User(input);
  return await newUser.save();
};

const getAllUsers = async () => {
  const users = await User.find({}, USER_RETURN_FIELDS);
  return users;
};

const getUserWithTodo = async (id) => {
  const [userWithTodo] = await User.aggregate([
    {
      $match: {
        _id: ObjectId(id),
      },
    },
    {
      $lookup: {
        from: TODO_COLLECTION,
        localField: '_id',
        foreignField: 'creatorId',
        as: TODO_FIELD,
      },
    },
    {
      $limit: 1,
    },
  ]).project(USER_WITH_TODO_RETURN_FIELDS);
  return userWithTodo;
};

const removeUser = async (id) => {
  return await User.findByIdAndDelete(id);
};

export { verifyUser, createUser, getAllUsers, getUserWithTodo, removeUser };

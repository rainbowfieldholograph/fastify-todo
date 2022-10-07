import mongoose from 'mongoose';
import { TODO_COLLECTION } from '../../database/models/constants.js';
import { User } from '../../database/models/user.js';
import {
  USER_RETURN_FIELDS,
  USER_WITH_TODO_RETURN_FIELDS,
  TODO_FIELD,
} from './user.constants.js';

const verifyUser = async (email, password) => {
  const foundUser = (await User.findOne({ email, password }))?.toObject();

  if (!foundUser) return null;

  delete foundUser.password;

  return foundUser;
};

const createUser = async (input) => {
  const newUser = await new User(input).save();
  const createdUser = newUser.toObject();

  delete createdUser.password;

  return createdUser;
};

const getAllUsers = async () => {
  const users = await User.find({}, USER_RETURN_FIELDS);

  return users;
};

const getUserWithTodo = async (id) => {
  const [userWithTodo] = await User.aggregate([
    {
      $match: {
        _id: mongoose.Types.ObjectId(id),
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
  const removedUser = await User.findByIdAndDelete(id);

  return removedUser;
};

export { verifyUser, createUser, getAllUsers, getUserWithTodo, removeUser };

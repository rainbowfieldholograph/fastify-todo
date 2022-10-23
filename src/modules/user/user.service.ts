import { Types } from 'mongoose';
import { TODO_COLLECTION } from 'database/constants';
import { User, UserModel } from 'database/models/user';
import {
  USER_RETURN_FIELDS,
  USER_WITH_TODO_RETURN_FIELDS,
  TODO_FIELD,
} from './user.constants';
import { MakeOptional } from 'utils/make-optional';

const verifyUser = async (email: string, password: string) => {
  const foundUser = await UserModel.findOne({ email, password });
  if (!foundUser) return null;

  const foundUserObject = foundUser.toObject<MakeOptional<User, 'password'>>();
  delete foundUserObject.password;

  return foundUserObject as Omit<User, 'password'>;
};

const createUser = async (input: any) => {
  const newUser = await new UserModel(input).save();
  const createdUser = newUser.toObject() as any;

  delete createdUser.password;

  return createdUser;
};

const getAllUsers = async () => {
  const users = await UserModel.find({}, USER_RETURN_FIELDS);

  return users;
};

const getUserWithTodo = async (id: any) => {
  const [userWithTodo] = await UserModel.aggregate([
    {
      $match: {
        _id: new Types.ObjectId(id),
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
  ]).project(USER_WITH_TODO_RETURN_FIELDS as any);

  return userWithTodo;
};

const removeUser = async (id: any) => {
  const removedUser = await UserModel.findByIdAndDelete(id);

  return removedUser;
};

export { verifyUser, createUser, getAllUsers, getUserWithTodo, removeUser };

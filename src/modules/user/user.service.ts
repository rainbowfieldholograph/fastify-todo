import { User, UserModel } from 'database/models/user';
import { USER_RETURN_FIELDS } from './user.constants';
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

const getUser = async (id: User['_id']) => {
  const user = await UserModel.findById(id);

  if (!user) return null;

  return user.toObject();
};

const removeUser = async (id: any) => {
  const removedUser = await UserModel.findByIdAndDelete(id);

  return removedUser;
};

const updateUser = async (id: User['_id'], updateData: Omit<User, '_id'>) => {
  const updatedUser = await UserModel.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  });

  return updatedUser;
};

export { verifyUser, createUser, getAllUsers, removeUser, getUser, updateUser };

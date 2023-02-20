import { User, UserModel } from 'database/models/user';
import { USER_RETURN_FIELDS } from './user.constants';
import { MakeOptional } from 'utils/make-optional';

type CreateUserInput = Pick<User, 'email' | 'password' | 'username'>;
type UpdateUserInput = Partial<Pick<User, 'password' | 'email' | 'username'>>;

const verifyUser = async (email: string, password: string) => {
  const foundUser = await UserModel.findOne({ email, password });
  if (!foundUser) return null;

  const foundUserObject = foundUser.toObject<MakeOptional<User, 'password'>>();
  delete foundUserObject.password;

  return foundUserObject as Omit<User, 'password'>;
};

const createUser = async (input: CreateUserInput) => {
  const newUser = await new UserModel(input).save();
  const createdUser = newUser.toObject();

  const { password, ...userWithoutPassword } = createdUser;

  return userWithoutPassword;
};

const getAllUsers = async () => {
  const users = await UserModel.find({}, USER_RETURN_FIELDS);

  return users;
};

const getUser = async (id: string) => {
  const user = await UserModel.findById(id);

  if (!user) return null;

  return user.toObject();
};

const removeUser = async (id: string) => {
  const removedUser = await UserModel.findByIdAndDelete(id);

  return removedUser;
};

const updateUser = async (id: string, updateData: UpdateUserInput) => {
  const updatedUser = await UserModel.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  });

  return updatedUser;
};

export { verifyUser, createUser, getAllUsers, removeUser, getUser, updateUser };

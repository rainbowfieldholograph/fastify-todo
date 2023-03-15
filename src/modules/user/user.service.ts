import { User, UserModel } from 'database/models/user';
import { USER_RETURN_FIELDS } from './user.constants';

type CreateUserInput = Pick<User, 'email' | 'password' | 'username'>;
type UpdateUserInput = Partial<Pick<User, 'password' | 'email' | 'username'>>;
type Credentials = {
  email: string;
  password: string;
};

const verifyUser = async (
  credentials: Credentials,
): Promise<Omit<User, 'password'> | null> => {
  const foundUser = await UserModel.findOne(credentials).lean();
  if (!foundUser) return null;

  const { password, ...userWithoutPassword } = foundUser;

  return userWithoutPassword;
};

const createUser = async (input: CreateUserInput): Promise<Omit<User, 'password'>> => {
  const newUser = await new UserModel(input).save();
  const createdUser = newUser.toObject();

  const { password, ...userWithoutPassword } = createdUser;

  return userWithoutPassword;
};

const getAllUsers = async (): Promise<User[]> => {
  const users = await UserModel.find({}, USER_RETURN_FIELDS).lean();

  return users;
};

const getUser = async (id: string): Promise<User | null> => {
  const user = await UserModel.findById(id).lean();

  return user;
};

const removeUser = async (id: string): Promise<User | null> => {
  const removedUser = await UserModel.findByIdAndDelete(id).lean();

  return removedUser;
};

const updateUser = async (
  id: string,
  updateData: UpdateUserInput,
): Promise<User | null> => {
  const updatedUser = await UserModel.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  }).lean();

  return updatedUser;
};

export { verifyUser, createUser, getAllUsers, removeUser, getUser, updateUser };

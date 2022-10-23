import { TodoModel } from 'database/models/todo';
import { PostTodo } from './schemas';

const createTodo = async (data: PostTodo) => {
  const newTodo = new TodoModel(data);
  const createdTodo = await newTodo.save();

  return createdTodo;
};

const getAllTodo = async () => {
  const foundAllTodo = await TodoModel.find({});

  return foundAllTodo;
};

const getTodoById = async (id: string) => {
  const foundTodo = await TodoModel.findById(id);

  return foundTodo;
};

const removeTodo = async (id: string) => {
  const removedTodo = await TodoModel.findByIdAndDelete(id);

  return removedTodo;
};

const updateTodo = async (id: string, input: any) => {
  const updatedTodo = await TodoModel.findByIdAndUpdate(id, input, { new: true });

  return updatedTodo;
};

export { createTodo, getAllTodo, getTodoById, removeTodo, updateTodo };

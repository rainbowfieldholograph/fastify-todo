import { Todo, TodoModel } from 'database/models/todo';
import { Types } from 'mongoose';

type CreateTodoInput = Pick<Todo, 'description' | 'title'>;
type UpdateTodoInput = Partial<Pick<Todo, 'completed' | 'description' | 'title'>>;

const createTodo = async (data: CreateTodoInput) => {
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

const updateTodo = async (id: string, input: UpdateTodoInput) => {
  const updatedTodo = await TodoModel.findByIdAndUpdate(id, input, { new: true });

  return updatedTodo;
};

const getUserTodos = async (userId: string) => {
  const todos = await TodoModel.find({ creatorId: new Types.ObjectId(userId) });

  if (!todos) return null;

  return todos;
};

export { createTodo, getAllTodo, getTodoById, removeTodo, updateTodo, getUserTodos };

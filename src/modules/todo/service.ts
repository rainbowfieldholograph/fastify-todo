import { Todo, TodoModel } from 'database/models/todo';
import { Types } from 'mongoose';
import { TodoSortFields, TodoSortTypes } from './config';

type CreateTodoInput = Pick<Todo, 'description' | 'title'>;
type UpdateTodoInput = Partial<Pick<Todo, 'completed' | 'description' | 'title'>>;

const createTodo = async (data: CreateTodoInput): Promise<Todo> => {
  const newTodo = new TodoModel(data);
  const createdTodo = await newTodo.save();

  return createdTodo;
};

const getAllTodo = async (): Promise<Todo[]> => {
  const foundAllTodo = await TodoModel.find({}).lean();

  return foundAllTodo;
};

const getTodoById = async (id: string): Promise<Todo | null> => {
  const foundTodo = await TodoModel.findById(id).lean();

  return foundTodo;
};

const removeTodo = async (id: string): Promise<Todo | null> => {
  const removedTodo = await TodoModel.findByIdAndDelete(id).lean();

  return removedTodo;
};

const updateTodo = async (id: string, input: UpdateTodoInput): Promise<Todo | null> => {
  const updatedTodo = await TodoModel.findByIdAndUpdate(id, input, { new: true }).lean();

  return updatedTodo;
};

type Sort = { sortBy: TodoSortFields[number]; sortType: TodoSortTypes[number] };

type GetUserTodosInput = { userId: string; sort?: Sort };

const getUserTodos = async ({ userId, sort }: GetUserTodosInput): Promise<Todo[]> => {
  const todoDocuments = TodoModel.find({ creatorId: new Types.ObjectId(userId) });

  if (!sort) return await todoDocuments.lean();

  const { sortBy, sortType } = sort;
  const todos = await todoDocuments
    .collation({ locale: 'en' })
    .sort({ [sortBy]: sortType })
    .lean();

  return todos;
};

export { createTodo, getAllTodo, getTodoById, removeTodo, updateTodo, getUserTodos };

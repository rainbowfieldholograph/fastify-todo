import { Todo } from '../../database/models/todo.js';

const createTodo = async (data) => {
  const newTodo = new Todo(data);
  const createdTodo = await newTodo.save();

  return createdTodo;
};

const getAllTodo = async () => {
  const foundAllTodo = await Todo.find({});

  return foundAllTodo;
};

const getTodoById = async (id) => {
  const foundTodo = await Todo.findById(id);

  return foundTodo;
};

const removeTodo = async (id) => {
  const removedTodo = await Todo.findByIdAndDelete(id);

  return removedTodo;
};

const updateTodo = async (id, input) => {
  const updatedTodo = await Todo.findByIdAndUpdate(id, input, { new: true });

  return updatedTodo;
};

export { createTodo, getAllTodo, getTodoById, removeTodo, updateTodo };

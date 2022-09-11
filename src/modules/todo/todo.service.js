import { Todo } from '../../models/todo.js';

const createTodo = async (data) => {
  const newTodo = new Todo(data);
  return await newTodo.save();
};

const getAllTodo = async () => {
  return await Todo.find({});
};

const getTodoById = async (id) => {
  return await Todo.findById(id);
};

const removeTodo = async (id) => {
  return await Todo.findByIdAndDelete(id);
};

const updateTodo = async (id, input) => {
  return await Todo.findByIdAndUpdate(id, input, { new: true });
};

export { createTodo, getAllTodo, getTodoById, removeTodo, updateTodo };

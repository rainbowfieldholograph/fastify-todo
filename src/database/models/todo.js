import mongoose from 'mongoose';
import { TODO_COLLECTION } from './constants.js';

const todo = mongoose.Schema({
  creatorId: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  completed: {
    type: String,
    required: true,
  },
});

export const Todo = mongoose.model(TODO_COLLECTION, todo, TODO_COLLECTION);

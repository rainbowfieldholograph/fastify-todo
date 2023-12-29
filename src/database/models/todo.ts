import { SchemaType } from '../schema-type';
import { Schema, model, Types } from 'mongoose';
import { TODO_COLLECTION, USER_COLLECTION } from '../config';

const todoSchema = new Schema({
  creatorId: {
    type: Types.ObjectId,
    required: true,
    ref: USER_COLLECTION,
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
    type: Boolean,
    required: true,
  },
});

export const TodoModel = model(TODO_COLLECTION, todoSchema, TODO_COLLECTION);

export type Todo = SchemaType<typeof todoSchema>;

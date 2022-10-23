import { SchemaType } from 'database/schema-type';
import { Schema, model } from 'mongoose';
import { USER_COLLECTION } from '../constants';

const userSchema = new Schema({
  email: {
    unique: true,
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

export const UserModel = model(USER_COLLECTION, userSchema, USER_COLLECTION);

export type User = SchemaType<typeof userSchema>;

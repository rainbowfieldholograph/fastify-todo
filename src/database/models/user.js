import mongoose from 'mongoose';
import { USER_COLLECTION } from './constants.js';

const user = mongoose.Schema({
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

export const User = mongoose.model(USER_COLLECTION, user, USER_COLLECTION);

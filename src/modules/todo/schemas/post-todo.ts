import { z } from 'zod';
import { descriptionSchema, titleSchema } from './todo';

const postTodoBodySchema = z.object({
  title: titleSchema,
  description: descriptionSchema,
});

export const postTodoSchema = {
  body: postTodoBodySchema,
};

export type PostTodo = z.infer<typeof postTodoBodySchema>;
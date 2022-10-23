import { z } from 'zod';

const postTodoBodySchema = z.object({
  title: z.string().max(40),
  description: z.string(),
});

export const postTodoSchema = {
  body: postTodoBodySchema,
};

export type PostTodo = z.infer<typeof postTodoBodySchema>;

import { z } from 'zod';

const putTodoSchemaBody = z.object({
  title: z.string().max(40),
  description: z.string(),
  completed: z.boolean(),
});

const putTodoSchemaParams = z.object({
  id: z.string(),
});

export const putTodoSchema = {
  body: putTodoSchemaBody,
  params: putTodoSchemaParams,
};

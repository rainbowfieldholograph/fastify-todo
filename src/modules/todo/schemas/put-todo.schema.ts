import { z } from 'zod';
import { completedSchema, descriptionSchema, titleSchema } from './todo.schema';

const putTodoSchemaBody = z.object({
  title: titleSchema,
  description: descriptionSchema,
  completed: completedSchema,
});

const putTodoSchemaParams = z.object({
  id: z.string(),
});

export const putTodoSchema = {
  body: putTodoSchemaBody,
  params: putTodoSchemaParams,
};

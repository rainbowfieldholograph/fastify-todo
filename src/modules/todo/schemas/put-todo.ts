import { z } from 'zod';
import { completedSchema, descriptionSchema, titleSchema } from './todo';

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

import { z } from 'zod';
import { completedSchema, descriptionSchema, titleSchema } from './todo.schema';

const patchTodoSchemaParams = z.object({
  id: z.string(),
});

const patchTodoSchemaBody = z.object({
  title: titleSchema.optional(),
  description: descriptionSchema.optional(),
  completed: completedSchema.optional(),
});

export const patchTodoSchema = {
  params: patchTodoSchemaParams,
  body: patchTodoSchemaBody,
};

export type PatchTodoBody = z.infer<typeof patchTodoSchemaBody>;
export type PatchTodoParams = z.infer<typeof patchTodoSchemaParams>;

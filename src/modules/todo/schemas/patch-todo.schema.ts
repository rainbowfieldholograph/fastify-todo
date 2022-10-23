import { z } from 'zod';

const patchTodoSchemaParams = z.object({
  id: z.string(),
});

const patchTodoSchemaBody = z.object({
  title: z.string(),
  description: z.string(),
  completed: z.boolean(),
});

export const patchTodoSchema = {
  params: patchTodoSchemaParams,
  body: patchTodoSchemaBody,
};

export type PatchTodoParams = z.infer<typeof patchTodoSchemaParams>;

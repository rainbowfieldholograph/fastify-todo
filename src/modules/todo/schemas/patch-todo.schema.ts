import { z } from 'zod';

const patchTodoSchemaParams = z.object({
  id: z.string(),
});

const patchTodoSchemaBody = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  completed: z.boolean().optional(),
});

// z.union([z.boolean(), z.string()]

export const patchTodoSchema = {
  params: patchTodoSchemaParams,
  body: patchTodoSchemaBody,
};

export type PatchTodoParams = z.infer<typeof patchTodoSchemaParams>;

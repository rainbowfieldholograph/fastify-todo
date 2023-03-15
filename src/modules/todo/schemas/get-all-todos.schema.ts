import { z } from 'zod';
import { todoSortValues } from '../todo.constant';

const getAllTodosSchemaQuerystring = z.object({
  sort: z.enum(todoSortValues).optional(),
});

export const getAllTodosSchema = {
  querystring: getAllTodosSchemaQuerystring,
};

export type GetAllTodosQuerystring = z.infer<typeof getAllTodosSchemaQuerystring>;

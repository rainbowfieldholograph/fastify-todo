import { z } from 'zod';
import { sortFields, sortTypes } from '../todo.constant';

const getAllTodosSchemaQuerystring = z
  .object({
    sortBy: z.enum(sortFields).optional(),
    sortType: z.enum(sortTypes).optional(),
  })
  .refine(
    (data) =>
      (data.sortBy === undefined && data.sortType === undefined) ||
      (data.sortBy !== undefined && data.sortType !== undefined),
    {
      message: "Both 'sortBy' and 'sortType' fields must be used together",
    },
  );

export const getAllTodosSchema = {
  querystring: getAllTodosSchemaQuerystring,
};

export type GetAllTodosQuerystring = z.infer<typeof getAllTodosSchemaQuerystring>;

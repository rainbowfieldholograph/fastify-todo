import { sortFields, sortTypes } from './config';
import { Type } from '@sinclair/typebox';

const todo = Type.Object({
  title: Type.String({ maxLength: 40 }),
  description: Type.String(),
  completed: Type.Boolean(),
});

export const putTodoBody = Type.Pick(todo, ['title', 'description', 'completed']);
export const putTodoParams = Type.Object({ id: Type.String() });

export const postTodoBody = Type.Pick(todo, ['title', 'description']);

export const patchTodoBody = Type.Optional(
  Type.Pick(todo, ['title', 'description', 'completed']),
);
export const patchTodoParams = Type.Object({ id: Type.String() });

const sort = Type.Object({
  sortBy: Type.Union(sortFields.map((field) => Type.Literal(field))),
  sortType: Type.Union(sortTypes.map((sort) => Type.Literal(sort))),
});

export const getAllTodosQuerystring = Type.Intersect([
  Type.Omit(sort, ['sortBy']),
  Type.Omit(sort, ['sortType']),
]);

export const getTodoParams = Type.Object({ id: Type.String() });

export const removeTodoParams = Type.Object({ id: Type.String() });

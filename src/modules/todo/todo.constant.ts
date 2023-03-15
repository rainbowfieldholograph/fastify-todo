export type TodoSortFields = 'completed' | 'description' | 'title';
type SortField<T extends TodoSortFields> = `${T}|asc` | `${T}|desc`;
type SortOptions = Array<SortField<TodoSortFields>>;

export const todoSortValues = [
  'completed|asc',
  'completed|desc',
  'description|asc',
  'description|desc',
  'title|asc',
  'title|desc',
] as const satisfies Readonly<SortOptions>;

export type TodoSortTypes = 'asc' | 'desc';
export type TodoSort = (typeof todoSortValues)[number];

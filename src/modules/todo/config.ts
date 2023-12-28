export const sortTypes = ['asc', 'desc'] as const;
export const sortFields = ['completed', 'description', 'title'] as const;

export type TodoSortTypes = typeof sortTypes;
export type TodoSortFields = typeof sortFields;
